import { useState, useEffect } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { LoadingSpinner } from 'components/LoadingSpinner/LoadingSpinner';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';
import { getSearchImage } from 'services/pixabayApi';
import { smoothScroll } from 'services/smoothscroll';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppStyle } from './App.styled';

const perPage = 12;

export const App = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setsearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const onSubmit = query => {
    if (searchQuery === query) {
      Notify.warning('images for this query are now shown');
      return;
    }
    setsearchQuery(query);
    setPage(1);
    setImages([]);
    setIsLoading(true);
    setIsError(false);
  };

  const handleLoadMoreButton = () => {
    setPage(prevState => prevState + 1);

    setTimeout(() => {
      smoothScroll();
    }, 500);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    const fetchImage = async () => {
      try {
        const data = await getSearchImage(searchQuery, page);

        if (data.hits.length === 0) {
          Notify.warning(
            'Sorry, there are no images matching your serach query, please try again'
          );
          setIsLoading(false);
          return;
        }

        setImages(prevImages => [...prevImages, ...data.hits]);
        setIsLoading(false);

        let totalPage = data.totalHits / perPage;

        if (totalPage > 1) {
          setIsLoadMore(true);
        }

        if (page > totalPage) {
          setIsLoadMore(false);
        }
      } catch (error) {
        console.log(error.message);
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchImage();
  }, [page, searchQuery]);

  return (
    <AppStyle>
      {isError && <ErrorMessage />}
      <SearchBar onSubmit={onSubmit} />
      {isLoading && <LoadingSpinner />}
      <ImageGallery images={images} />
      {isLoadMore && (
        <LoadMoreButton handleLoadMoreButton={handleLoadMoreButton} />
      )}
    </AppStyle>
  );
};
