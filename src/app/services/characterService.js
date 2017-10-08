'use strict';

let service = function ($http) {

    let self = this;

    /**
     * get characters with api
     */
    self.getCharacters = params => {
      let marvelAPI;
      if (params === undefined || params === '') {
        marvelAPI = 'https://gateway.marvel.com/v1/public/characters?limit=22&offset=100&ts=1&apikey=341a95817b7b9de8aae6faf4e7f4a7c7&hash=ec3c115f9582162ea11ece82bd729bfd';
      }else {
        marvelAPI = 'https://gateway.marvel.com:443/v1/public/characters' + '?&limit=' + params["limit"] + '&offset=' + params["offset"] + '&ts=1&apikey=341a95817b7b9de8aae6faf4e7f4a7c7&hash=ec3c115f9582162ea11ece82bd729bfd'
      }
      return $http({
          method: 'GET',
          url: marvelAPI
      }).then(response => {
          return response.data.data.results;
      }).catch(error => {
          console.log(error);
      }).finally(() => {
      });
    };

    /**
     * get single character with api
     */
    self.getCharacter = idCharacter => {
      return $http({
          method: 'GET',
          url: 'https://gateway.marvel.com/v1/public/characters/'+idCharacter+'?ts=1&apikey=341a95817b7b9de8aae6faf4e7f4a7c7&hash=ec3c115f9582162ea11ece82bd729bfd'
      }).then(response => {
          return response.data.data.results[0];
      }).catch(error => {
          console.log(error);
      }).finally(() => {
      });
    };

    return self;
};

module.exports = service;
