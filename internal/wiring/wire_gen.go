// Code generated by Wire. DO NOT EDIT.

//go:generate go run github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package wiring

import (
	"github.com/google/wire"
	"github.com/tranHieuDev23/GoLoad/internal/app"
	"github.com/tranHieuDev23/GoLoad/internal/configs"
	"github.com/tranHieuDev23/GoLoad/internal/dataaccess"
	"github.com/tranHieuDev23/GoLoad/internal/dataaccess/cache"
	"github.com/tranHieuDev23/GoLoad/internal/dataaccess/database"
	"github.com/tranHieuDev23/GoLoad/internal/dataaccess/mq/consumer"
	"github.com/tranHieuDev23/GoLoad/internal/dataaccess/mq/producer"
	"github.com/tranHieuDev23/GoLoad/internal/handler"
	"github.com/tranHieuDev23/GoLoad/internal/handler/consumers"
	"github.com/tranHieuDev23/GoLoad/internal/handler/grpc"
	"github.com/tranHieuDev23/GoLoad/internal/handler/http"
	"github.com/tranHieuDev23/GoLoad/internal/logic"
	"github.com/tranHieuDev23/GoLoad/internal/utils"
)

// Injectors from wire.go:

func InitializeServer(configFilePath configs.ConfigFilePath) (*app.Server, func(), error) {
	config, err := configs.NewConfig(configFilePath)
	if err != nil {
		return nil, nil, err
	}
	configsDatabase := config.Database
	log := config.Log
	logger, cleanup, err := utils.InitializeLogger(log)
	if err != nil {
		return nil, nil, err
	}
	db, cleanup2, err := database.InitializeAndMigrateUpDB(configsDatabase, logger)
	if err != nil {
		cleanup()
		return nil, nil, err
	}
	goquDatabase := database.InitializeGoquDB(db)
	configsCache := config.Cache
	client := cache.NewRedisClient(configsCache, logger)
	takenAccountName := cache.NewTakenAccountName(client, logger)
	accountDataAccessor := database.NewAccountDataAccessor(goquDatabase, logger)
	accountPasswordDataAccessor := database.NewAccountPasswordDataAccessor(goquDatabase, logger)
	auth := config.Auth
	hash := logic.NewHash(auth)
	tokenPublicKey := cache.NewTokenPublicKey(client, logger)
	tokenPublicKeyDataAccessor := database.NewTokenPublicKeyDataAccessor(goquDatabase, logger)
	token, err := logic.NewToken(accountDataAccessor, tokenPublicKey, tokenPublicKeyDataAccessor, auth, logger)
	if err != nil {
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	account := logic.NewAccount(goquDatabase, takenAccountName, accountDataAccessor, accountPasswordDataAccessor, hash, token, logger)
	downloadTaskDataAccessor := database.NewDownloadTaskDataAccessor(goquDatabase, logger)
	mq := config.MQ
	producerClient, err := producer.NewClient(mq, logger)
	if err != nil {
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	downloadTaskCreatedProducer := producer.NewDownloadTaskCreatedProducer(producerClient, logger)
	downloadTask := logic.NewDownloadTask(token, accountDataAccessor, downloadTaskDataAccessor, downloadTaskCreatedProducer, goquDatabase, logger)
	goLoadServiceServer := grpc.NewHandler(account, downloadTask)
	configsGRPC := config.GRPC
	server := grpc.NewServer(goLoadServiceServer, configsGRPC, logger)
	configsHTTP := config.HTTP
	httpServer := http.NewServer(configsGRPC, configsHTTP, auth, logger)
	downloadTaskCreated := consumers.NewDownloadTaskCreated(logger)
	consumerConsumer, err := consumer.NewConsumer(mq, logger)
	if err != nil {
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	root := consumers.NewRoot(downloadTaskCreated, consumerConsumer, logger)
	appServer := app.NewServer(server, httpServer, root, logger)
	return appServer, func() {
		cleanup2()
		cleanup()
	}, nil
}

// wire.go:

var WireSet = wire.NewSet(configs.WireSet, utils.WireSet, dataaccess.WireSet, logic.WireSet, handler.WireSet, app.WireSet)
