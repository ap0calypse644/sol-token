import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgMintTokens } from "./types/solt/freezer/tx";
import { MsgUnfreezeTokens } from "./types/solt/freezer/tx";
import { MsgFreezeTokens } from "./types/solt/freezer/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/solt.freezer.MsgMintTokens", MsgMintTokens],
    ["/solt.freezer.MsgUnfreezeTokens", MsgUnfreezeTokens],
    ["/solt.freezer.MsgFreezeTokens", MsgFreezeTokens],
    
];

export { msgTypes }