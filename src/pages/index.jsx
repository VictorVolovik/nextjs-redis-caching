import bluebird from 'bluebird';
import uuid from 'react-uuid';
import redis from 'redis';

const fetchData = async (url) => {
  console.log("Fetching data...");

  try {
    const query = await fetch(url);
    return await query.json();
  } catch (err) {
    console.error(err);
  }
}

export const getStaticProps = async () => {
  bluebird.promisifyAll(redis.RedisClient.prototype);
  const cache = redis.createClient();
  let data = {};

  await cache.existsAsync("articles").then(async reply => {
    if (reply !== 1) { // cache miss => need to fetch data
      console.log("MISS");
      data = await fetchData('https://www.healthcare.gov/api/articles.json');
      await cache.set('articles', JSON.stringify(data));
    } else { // cache hit => get data from redis
      console.log("HIT")
      data = JSON.parse(await cache.getAsync('articles'));
    }
  })

  const articles = data?.articles || [];

  return {
    props: {
      articles,
    },
  };
};

const Home = ({ articles }) => (
  <article>
    <h1>HealthCare.gov Articles</h1>
    {articles && articles.length > 0 && (
      <table>
        <thead>
          <tr>
            <th>Language</th>
            <th>Article</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(el => (
            <tr key={uuid()}>
              <td>{el.lang}</td>
              <td>
                <a
                  href={'https://www.healthcare.gov' + el.url}
                  target="_blank"
                >
                  {el.title}
                </a>
              </td>
              <td>
                {el.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </article>
);

export default Home;
