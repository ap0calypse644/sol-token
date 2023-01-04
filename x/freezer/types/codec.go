package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgMintTokens{}, "freezer/MintTokens", nil)
	cdc.RegisterConcrete(&MsgFreezeTokens{}, "freezer/FreezeTokens", nil)
	cdc.RegisterConcrete(&MsgUnfreezeTokens{}, "freezer/UnfreezeTokens", nil)
	// this line is used by starport scaffolding # 2
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgMintTokens{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgFreezeTokens{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgUnfreezeTokens{},
	)
	// this line is used by starport scaffolding # 3

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
