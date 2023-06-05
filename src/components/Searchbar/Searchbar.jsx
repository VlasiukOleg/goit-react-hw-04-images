import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';

import { FcSearch } from 'react-icons/fc';
import {
  Header,
  SearchForm,
  SearchFormInput,
  SearchFormButton,
} from './Searchbar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = ({ target }) => {
    setQuery(target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!query.trim()) {
      Notify.warning('Please fill all fields');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FcSearch size={24} />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={query}
        />
      </SearchForm>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
