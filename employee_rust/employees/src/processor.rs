#![allow(unused_imports)]


use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    
    account_info::{AccountInfo, next_account_info}, 
    entrypoint, 
    entrypoint::ProgramResult,
    program_error::ProgramError,
    pubkey::Pubkey,
    msg,

};

use borsh::{
    maybestd::io::Error,
};



pub fn addEmployee(
    programId:&Pubkey,
    accounts:&[AccountInfo],
    _instruction_data:&[u8]) -> ProgramResult{

        let accounts_iter = &mut accounts.iter();
        let data_account = next_account_info(accounts_iter)?;

        let employee_data = crate::state::Employee::try_from_slice(&_instruction_data)?;
        let mut company_data = try_from_slice_unchecked::<crate::state::Employee>(*data_account.data.borrow()).unwrap();

        // company_data.employees.push(employee_data);
        company_data.id = employee_data.id;
        company_data.name = employee_data.name;
        company_data.phone = employee_data.phone;
        company_data.grade = employee_data.grade;

        company_data.serialize(&mut &mut data_account.try_borrow_mut_data()?[..])?;

        Ok(())
}

pub fn updateEmployee(programId:&Pubkey,
    accounts:&[AccountInfo],
    _instruction_data:&[u8]) -> ProgramResult {

        let accounts_iter = &mut accounts.iter();
        let data_account = next_account_info(accounts_iter)?;

        let employee_grade_data = crate::state::EmployeeGrade::try_from_slice(&_instruction_data)?;
        let mut company_data = try_from_slice_unchecked::<crate::state::Employee>(*data_account.data.borrow()).unwrap();

        company_data.id = employee_grade_data.id;
        company_data.grade = employee_grade_data.grade;

        company_data.serialize(&mut &mut data_account.try_borrow_mut_data()?[..])?;

        Ok(())
    }

    // Internal Method
    pub fn try_from_slice_unchecked<T: BorshDeserialize>(data: &[u8]) -> Result<T, Error> {
    let mut data_mut = data;
    let result = T::deserialize(&mut data_mut)?;
    Ok(result)
}