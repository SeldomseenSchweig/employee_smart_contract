#![cfg(not(feature = "no-entrypoint"))]

use solana_program::{
    account_info::AccountInfo, 
    entrypoint, 
    entrypoint::ProgramResult, 
    pubkey::Pubkey
};

entrypoint!(processInstruction);

fn processInstruction(
    program_id: &Pubkey,
    accounts:&[AccountInfo],
    instruction_data:&[u8]) -> ProgramResult
    {
     crate::instruction::process_instruction(program_id, accounts, instruction_data)

} 


