import uuid from 'react-uuid';

const fetchData = async (url) => {
  try {
    const query = await fetch(url);
    return await query.json();
  } catch (err) {
    console.error(err);
  }
}

export const getStaticProps = async () => {
  const data = await fetchData('https://www.healthcare.gov/api/articles.json');
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
