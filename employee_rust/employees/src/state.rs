#![allow(unused_imports)]


use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshDeserialize, BorshSerialize, Debug, Clone)]
pub struct Employee {
    pub id:u64,
    pub name: String,
    pub phone: String,
    pub grade: u64
}


#[derive(BorshDeserialize, BorshSerialize, Debug, Clone)]

pub struct Company {
    
    pub employees: Vec<Employee>
}

#[derive(BorshDeserialize, BorshSerialize, Debug, Clone)]
pub struct EmployeeGrade {
    pub id:u64,
    pub grade: u64
}


