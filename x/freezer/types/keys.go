package types

const (
	// ModuleName defines the module name
	ModuleName = "freezer"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey defines the module's message routing key
	RouterKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_freezer"
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}

// keys
var (
	TokenKeyPrefix  = []byte{0x11}
	FreezeKeyPrefix = []byte{0x21}
)
