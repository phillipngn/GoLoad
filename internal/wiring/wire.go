//go:build wireinject
// +build wireinject

//
//go:generate go run github.com/google/wire/cmd/wire
package wiring

import (
	"github.com/google/wire"
	"github.com/tranHieuDev23/GoLoad/internal/configs"
	"github.com/tranHieuDev23/GoLoad/internal/dataaccess"
	"github.com/tranHieuDev23/GoLoad/internal/handler"
	"github.com/tranHieuDev23/GoLoad/internal/handler/grpc"
	"github.com/tranHieuDev23/GoLoad/internal/logic"
)

var WireSet = wire.NewSet(
	configs.WireSet,
	dataaccess.WireSet,
	logic.WireSet,
	handler.WireSet,
)

func InitializeGRPCServer(configFilePath configs.ConfigFilePath) (grpc.Server, func(), error) {
	wire.Build(WireSet)

	return nil, nil, nil
}
