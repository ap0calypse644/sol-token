package freezer

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	"solt/testutil/sample"
	freezersimulation "solt/x/freezer/simulation"
	"solt/x/freezer/types"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = freezersimulation.FindAccount
	_ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgMintTokens = "op_weight_msg_mint_tokens"
	// TODO: Determine the simulation weight value
	defaultWeightMsgMintTokens int = 100

	opWeightMsgFreezeTokens = "op_weight_msg_freeze_tokens"
	// TODO: Determine the simulation weight value
	defaultWeightMsgFreezeTokens int = 100

	opWeightMsgUnfreezeTokens = "op_weight_msg_unfreeze_tokens"
	// TODO: Determine the simulation weight value
	defaultWeightMsgUnfreezeTokens int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	freezerGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&freezerGenesis)
}

// ProposalContents doesn't return any content functions for governance proposals
func (AppModule) ProposalContents(_ module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// RandomizedParams creates randomized  param changes for the simulator
func (am AppModule) RandomizedParams(_ *rand.Rand) []simtypes.ParamChange {
	freezerParams := types.DefaultParams()
	return []simtypes.ParamChange{
		simulation.NewSimParamChange(types.ModuleName, string(types.KeyMaxIssueLimit), func(r *rand.Rand) string {
			return string(types.Amino.MustMarshalJSON(freezerParams.MaxIssueLimit))
		}),
	}
}

// RegisterStoreDecoder registers a decoder
func (am AppModule) RegisterStoreDecoder(_ sdk.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)

	var weightMsgMintTokens int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgMintTokens, &weightMsgMintTokens, nil,
		func(_ *rand.Rand) {
			weightMsgMintTokens = defaultWeightMsgMintTokens
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgMintTokens,
		freezersimulation.SimulateMsgMintTokens(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgFreezeTokens int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgFreezeTokens, &weightMsgFreezeTokens, nil,
		func(_ *rand.Rand) {
			weightMsgFreezeTokens = defaultWeightMsgFreezeTokens
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgFreezeTokens,
		freezersimulation.SimulateMsgFreezeTokens(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgUnfreezeTokens int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgUnfreezeTokens, &weightMsgUnfreezeTokens, nil,
		func(_ *rand.Rand) {
			weightMsgUnfreezeTokens = defaultWeightMsgUnfreezeTokens
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgUnfreezeTokens,
		freezersimulation.SimulateMsgUnfreezeTokens(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
