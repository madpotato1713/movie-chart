import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../styles/App.module.css';

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);

  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  return (
    <div>
      <Link to='/'>{'< Home'}</Link>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          <h1 className={styles.big}>{movie.title}</h1>
          <img src={movie.medium_cover_image} alt={movie.title} />
          <p>{movie.description_full}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
