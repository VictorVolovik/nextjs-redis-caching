import uuid from 'react-uuid';

const fetchData = async () => {

}

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

const Home = () => (
  <article>
    <h1>HealthCare.gov Articles</h1>
    <table>
      <thead>
        <tr>
          <th>Language</th>
          <th>Article</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>en</td>
          <td><a href="#" target="_blank">Article's title 1</a></td>
          <td>2020-04-10 00:00:00 -0400</td>
        </tr>
        <tr>
          <td>es</td>
          <td><a href="#" target="_blank">Article's title 2</a></td>
          <td>2020-04-10 00:00:00 -0400</td>
        </tr>
        <tr>
          <td>en</td>
          <td><a href="#" target="_blank">Article's title 3</a></td>
          <td>2020-04-10 00:00:00 -0400</td>
        </tr>
      </tbody>
    </table>
  </article>
);

export default Home;
