#![allow(unused_imports)]

use solana_program::{
    account_info::{AccountInfo}, 
    entrypoint, 
    entrypoint::ProgramResult,
    program_error::ProgramError,
    pubkey::Pubkey,
    msg,

};




pub fn process_instruction(
    program_id:&Pubkey,
    accounts:&[AccountInfo],
    instruction_data:&[u8]) -> ProgramResult
    {
        if instruction_data.len() == 0{
        msg!("NOT Instructions")
        }

        if instruction_data[0] == 1 {
            return crate::processor::addEmployee(
                program_id,
                accounts,
                &instruction_data[1..instruction_data.len()]
            )
        }else if instruction_data[0] == 2 {
            return crate::processor::updateEmployee(
                program_id,
                accounts,
                &instruction_data[1..instruction_data.len()]
            )
        }else if instruction_data[0] == 3{
            return crate::processor::deleteEmployee(
                program_id,
                accounts,
                &instruction_data[1..instruction_data.len()]
            )

        }
        else if instruction_data[0] == 4{
            return crate::processor::transfer_tokens(
                program_id,
                accounts,
                &instruction_data[1..instruction_data.len()]
            )

        }

msg!("Yada Yada");
Err(ProgramError::InvalidInstructionData)
    }

