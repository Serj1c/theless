package store

import (
	"github.com/globalsign/mgo"
	"github.com/varkadov/theless/api/store/favorites-repository"
	"github.com/varkadov/theless/api/store/userRepository"
)

type Store struct {
	db                  *mgo.Database
	userRepository      *userRepository.UserRepository
	favoritesRepository *favoritesRepository.FavoritesRepository
}

func New(db *mgo.Database) *Store {
	return &Store{
		db:                  db,
		userRepository:      userRepository.New(db),
		favoritesRepository: favoritesRepository.New(db),
	}
}

func (s *Store) User() *userRepository.UserRepository {
	return s.userRepository
}

func (s *Store) Favorites() *favoritesRepository.FavoritesRepository {
	return s.favoritesRepository
}
