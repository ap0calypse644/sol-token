package types

import (
	"fmt"

	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"gopkg.in/yaml.v2"
)

var _ paramtypes.ParamSet = (*Params)(nil)

var (
	KeyMaxIssueLimit = []byte("MaxIssueLimit")
	// TODO: Determine the default value
	DefaultMaxIssueLimit uint64 = 0
)

// ParamKeyTable the param key table for launch module
func ParamKeyTable() paramtypes.KeyTable {
	return paramtypes.NewKeyTable().RegisterParamSet(&Params{})
}

// NewParams creates a new Params instance
func NewParams(
	maxIssueLimit uint64,
) Params {
	return Params{
		MaxIssueLimit: maxIssueLimit,
	}
}

// DefaultParams returns a default set of parameters
func DefaultParams() Params {
	return NewParams(
		DefaultMaxIssueLimit,
	)
}

// ParamSetPairs get the params.ParamSet
func (p *Params) ParamSetPairs() paramtypes.ParamSetPairs {
	return paramtypes.ParamSetPairs{
		paramtypes.NewParamSetPair(KeyMaxIssueLimit, &p.MaxIssueLimit, validateMaxIssueLimit),
	}
}

// Validate validates the set of params
func (p Params) Validate() error {
	if err := validateMaxIssueLimit(p.MaxIssueLimit); err != nil {
		return err
	}

	return nil
}

// String implements the Stringer interface.
func (p Params) String() string {
	out, _ := yaml.Marshal(p)
	return string(out)
}

// validateMaxIssueLimit validates the MaxIssueLimit param
func validateMaxIssueLimit(v interface{}) error {
	maxIssueLimit, ok := v.(uint64)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}

	// TODO implement validation
	_ = maxIssueLimit

	return nil
}
