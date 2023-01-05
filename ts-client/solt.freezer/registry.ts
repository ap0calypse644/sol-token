import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgUnfreezeTokens } from "./types/solt/freezer/tx";
import { MsgMintTokens } from "./types/solt/freezer/tx";
import { MsgFreezeTokens } from "./types/solt/freezer/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/solt.freezer.MsgUnfreezeTokens", MsgUnfreezeTokens],
    ["/solt.freezer.MsgMintTokens", MsgMintTokens],
    ["/solt.freezer.MsgFreezeTokens", MsgFreezeTokens],
    
];

export { msgTypes }