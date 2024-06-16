import { Avatar, FormControl, MenuItem, Select } from "@mui/material";
import { ETHERUM_IMAGE, USDT_IMAGE } from "../Config/Config";
export function CurrencyList({callback,value}){
    
    return (
                <Select onChange={callback} value={value}>
                    <MenuItem value={"eth"}><Avatar src={ETHERUM_IMAGE}/></MenuItem>
                    <MenuItem value={"usdt"}><Avatar src={USDT_IMAGE}/></MenuItem>
                </Select>
    )
}