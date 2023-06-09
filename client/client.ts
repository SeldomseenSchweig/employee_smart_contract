const { Keypair } = require("@solana/web3.js");
const { LAMPORTS_PER_SOL } = require("@solana/web3.js");
const { PublicKey } = require("@solana/web3.js");
const solanaweb3 = require("@solana/web3.js")
const borsh = require("borsh")
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, getMint, getAccount, TOKEN_PROGRAM_ID } from '@solana/spl-token';




// connects to the solana network
    // --devnet for development
    const connection = new solanaweb3.Connection("https://api.devnet.solana.com","confirmed");

    // for gettng the size of the data for rent purposes
    class Employee {
        id:number
        name:string
        phone:string
        grade:number

        constructor(fields:{id:number, name:string, phone:string,grade:number}){
            this.id=fields.id,
            this.name=fields.name,
            this.phone=fields.phone,
            this.grade=fields.grade
        }
    }
    class UpdateEmployee {
        id:number

        grade:number

        constructor(fields:{id:number, grade:number}){
            this.id=fields.id,
            this.grade=fields.grade
        }
    }
    class Amount {
        amount:number;
        constructor(fields:{amount:number}){
            this.amount=fields.amount
        }
    }
    const ammountSchema = new Map([
        [
        Amount,
        {
            'kind':'struct',
            'fields':[
                ['amount', 'u64']
            ]
        }
    ]
    ])

    const employeeSchema = new Map([
        [
            Employee, 
            {
                'kind':'struct',
                'fields':[
                    ['id', "u64"],
                    ['name', "string"],
                    ['phone', "string"],
                    ['grade', "u64"]
                ]
            }
        ]
    ])

    const updateEmployeeSchema = new Map([
        [
            UpdateEmployee, 
            {
                'kind':'struct',
                'fields':[
                    ['id', "u64"],
                    ['grade', "u64"]
                ]
            }
        ]
    ])

    const EMPLOYEE_SIZE = borsh.serialize(
        employeeSchema,
        new Employee({id:1,name:"John Smith",phone: "9834-12", grade:123})
    
    ).length

async function client() {
    const programId = new solanaweb3.PublicKey("8f4tWJU1kVofUAJVey17yv5jif57GxsHbBTaRd2qmk8");

//     //  creates new private/public key 
//   const newKeyPair = Keypair.generate();
//   console.log(newKeyPair)
//   //Drops 2 SOL into the account35
//  connection.requestAirdrop(newKeyPair.publicKey, LAMPORTS_PER_SOL * 2)


const private_key = [
    174,  43,  71, 196, 184,   1, 205,  37, 10, 122,  10,
    118, 196, 190, 229, 119, 109,  33,   9, 37,  61, 226,
     49,  76, 144, 229,  61,  64,  60, 251, 55,  36, 173,
    238, 155,  56,  68, 233,  39, 130,  57, 23,  65, 178,
     29,  43, 220,  91, 241, 170,  35, 204, 36, 254,  33,
    109, 101, 183, 229,  70, 215, 137,  37, 75
  ];

  const feePayer = solanaweb3.Keypair.fromSecretKey(new Uint8Array(private_key));

   // gets rent for cda, account created by smart contract
   const lamportsEqualTo = await connection.getMinimumBalanceForRentExemption(EMPLOYEE_SIZE);

   const genpubkey = await solanaweb3.PublicKey.createWithSeed(feePayer.publicKey,"blihoiu8y",programId );

   console.log(genpubkey);

   const createAccountInstruction = solanaweb3.SystemProgram.createAccountWithSeed({
    fromPubkey:feePayer.publicKey, // why created the account/paid for it
    basePubkey: feePayer.publicKey, // why this
    seed:"blihoiu8y",
    lamports: lamportsEqualTo,
    newAccountPubkey: genpubkey,
    space: EMPLOYEE_SIZE,
    programId
});

const transaction = new solanaweb3.Transaction().add( createAccountInstruction);
transaction.feePayer = feePayer.publicKey
const signature = await solanaweb3.sendAndConfirmTransaction(connection, transaction, [feePayer]).catch((err:any) =>{
    console.log(err);
});

console.log(signature);


    
}

async function addEmployee(id:number, name:string, phone:string, grade:number){
    
    const emp = new Employee({id:id,name:name,phone:phone,grade:grade});
    const serEmp = borsh.serialize(employeeSchema,emp);
    const deserializedData = borsh.deserialize(employeeSchema, Employee, serEmp)
    
    
    let accounts = [{
        pubkey:new solanaweb3.PublicKey("J5ibHQpSChTHXT9N8MWoqafNkdTpEfGrkJm2jqzdFbF"),
        isSigner:false,
        isWritable:true

    }]
    const programId = new solanaweb3.PublicKey("8f4tWJU1kVofUAJVey17yv5jif57GxsHbBTaRd2qmk8");

    const addEmpIns = new solanaweb3.TransactionInstruction({
        keys:accounts,
        programId:programId,
        data:Buffer.from([1,...serEmp])
    })

    const private_key = [
        174,  43,  71, 196, 184,   1, 205,  37, 10, 122,  10,
        118, 196, 190, 229, 119, 109,  33,   9, 37,  61, 226,
         49,  76, 144, 229,  61,  64,  60, 251, 55,  36, 173,
        238, 155,  56,  68, 233,  39, 130,  57, 23,  65, 178,
         29,  43, 220,  91, 241, 170,  35, 204, 36, 254,  33,
        109, 101, 183, 229,  70, 215, 137,  37, 75
      ];
    
      const feePayer = solanaweb3.Keypair.fromSecretKey(new Uint8Array(private_key));

    const transaction = new solanaweb3.Transaction().add(addEmpIns);
transaction.feePayer = feePayer.publicKey
const signature = await solanaweb3.sendAndConfirmTransaction(connection, transaction, [feePayer]).catch((err:any) =>{
    console.log(err);
});

console.log(signature);

}

async function getEmployeeDetails(){

    const dataAccount = new solanaweb3.PublicKey("J5ibHQpSChTHXT9N8MWoqafNkdTpEfGrkJm2jqzdFbF");
    const programId = new solanaweb3.PublicKey("8f4tWJU1kVofUAJVey17yv5jif57GxsHbBTaRd2qmk8");

    const accounts = await connection.getParsedProgramAccounts(programId)
    const data =  await connection.getAccountInfo(dataAccount)

    let allAccounts:any = []
    for(let i = 0; i < accounts.length; i++){
      allAccounts.push(borsh.deserializeUnchecked(employeeSchema,Employee,accounts[i].account.data))
    }

    console.log(allAccounts)
    const deserializedDataEqualTo = borsh.deserializeUnchecked(employeeSchema,Employee,data.data)

}

async function updateEmployees(id:number, grade:number){
    const emp = new UpdateEmployee({id:id,grade:grade});
    const serEmp = borsh.serialize(updateEmployeeSchema,emp);
    let accounts = [{
        pubkey:new solanaweb3.PublicKey("J5ibHQpSChTHXT9N8MWoqafNkdTpEfGrkJm2jqzdFbF"),
        isSigner:false,
        isWritable:true

    }]

    const programId = new solanaweb3.PublicKey("8f4tWJU1kVofUAJVey17yv5jif57GxsHbBTaRd2qmk8");

    const addEmpIns = new solanaweb3.TransactionInstruction({
        keys:accounts,
        programId:programId,
        data:Buffer.from([2,...Buffer.from(serEmp)])
    })

    const private_key = [
        174,  43,  71, 196, 184,   1, 205,  37, 10, 122,  10,
        118, 196, 190, 229, 119, 109,  33,   9, 37,  61, 226,
         49,  76, 144, 229,  61,  64,  60, 251, 55,  36, 173,
        238, 155,  56,  68, 233,  39, 130,  57, 23,  65, 178,
         29,  43, 220,  91, 241, 170,  35, 204, 36, 254,  33,
        109, 101, 183, 229,  70, 215, 137,  37, 75
      ];
    
      const feePayer = solanaweb3.Keypair.fromSecretKey(new Uint8Array(private_key));

    const transaction = new solanaweb3.Transaction().add(addEmpIns);
transaction.feePayer = feePayer.publicKey
const signature = await solanaweb3.sendAndConfirmTransaction(connection, transaction, [feePayer]).catch((err:any) =>{
    console.log(err);
});

console.log(signature);

}

async function deleteData(){

    const private_key = [
        174,  43,  71, 196, 184,   1, 205,  37, 10, 122,  10,
        118, 196, 190, 229, 119, 109,  33,   9, 37,  61, 226,
         49,  76, 144, 229,  61,  64,  60, 251, 55,  36, 173,
        238, 155,  56,  68, 233,  39, 130,  57, 23,  65, 178,
         29,  43, 220,  91, 241, 170,  35, 204, 36, 254,  33,
        109, 101, 183, 229,  70, 215, 137,  37, 75
      ];

      const feePayer = solanaweb3.Keypair.fromSecretKey(new Uint8Array(private_key));

        let accounts = [
            {

                pubkey:new solanaweb3.PublicKey("J5ibHQpSChTHXT9N8MWoqafNkdTpEfGrkJm2jqzdFbF"),
                isSigner:false,
                isWritable:true
            }, 
            {
                pubkey:feePayer.publicKey,
                isSigner:true,
                isWritable:true

            }
        ]



    const programId = new solanaweb3.PublicKey("8f4tWJU1kVofUAJVey17yv5jif57GxsHbBTaRd2qmk8");

    const deleteEmpIns = new solanaweb3.TransactionInstruction({
        keys:accounts,
        programId:programId,
        data:Buffer.from([3])
    })


    
      

    const transaction = new solanaweb3.Transaction().add(deleteEmpIns);
    transaction.feePayer = feePayer.publicKey
    const signature = await solanaweb3.sendAndConfirmTransaction(connection, transaction, [feePayer]).catch((err:any) =>{
        console.log(err);
});

console.log(signature);


} 
async function createTokens(number:number) {


    const private_key = [
        174,  43,  71, 196, 184,   1, 205,  37, 10, 122,  10,
        118, 196, 190, 229, 119, 109,  33,   9, 37,  61, 226,
         49,  76, 144, 229,  61,  64,  60, 251, 55,  36, 173,
        238, 155,  56,  68, 233,  39, 130,  57, 23,  65, 178,
         29,  43, 220,  91, 241, 170,  35, 204, 36, 254,  33,
        109, 101, 183, 229,  70, 215, 137,  37, 75
      ];

      const payer = solanaweb3.Keypair.fromSecretKey(new Uint8Array(private_key));



const mintAuthority = payer
const freezeAuthority = payer
console.log("Mint Authority: ", mintAuthority)

const mint = await createMint(
  connection,
  payer,
  mintAuthority.publicKey,
  freezeAuthority.publicKey,
  9 // We are using 9 to match the CLI decimal default exactly
);

console.log("Mint Acccount: ",mint.toBase58());


const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
  )
  
  console.log("Token Account Address: ",tokenAccount.address.toBase58());
 
  let num_coins = number * 1000000000 
  await mintTo(
    connection,
    payer,
    mint,
    tokenAccount.address,
    mintAuthority,
    num_coins // because decimals for the mint are set to 9 
  )
  const mintInfo = await getMint(
    connection,
    mint
  )
  
  console.log("Supply: ",mintInfo.supply);
  // 1000
  
  const tokenAccountInfo = await getAccount(
    connection,
    tokenAccount.address
  )
  

    
    
}

async function transferTokens(numerbOfTokes:number){

    const toWallet = Keypair.generate();
    console.log(toWallet);

    const private_key = [
        174,  43,  71, 196, 184,   1, 205,  37, 10, 122,  10,
        118, 196, 190, 229, 119, 109,  33,   9, 37,  61, 226,
         49,  76, 144, 229,  61,  64,  60, 251, 55,  36, 173,
        238, 155,  56,  68, 233,  39, 130,  57, 23,  65, 178,
         29,  43, 220,  91, 241, 170,  35, 204, 36, 254,  33,
        109, 101, 183, 229,  70, 215, 137,  37, 75
      ];
      const mint = new solanaweb3.PublicKey("9ihniMP4GAvBgicTBUmDr4p3ik3eQLB89kSJ4a8MrKVA")
      const feePayer = solanaweb3.Keypair.fromSecretKey(new Uint8Array(private_key));

      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        feePayer, // payer of fees for space
        mint,
        toWallet.publicKey // owner of account
    );
      let accounts = [
        {
            pubkey: new solanaweb3.PublicKey("HgvWqfoXfihjQpViArDwaELHvmZXyZ5vkarwTeWpsxEA"),
            isSigner:false,
            isWritable:true

        },
        {
            pubkey:toTokenAccount.address,
            isSigner:false,
            isWritable:true

        },
        {

            pubkey:TOKEN_PROGRAM_ID,
            isSigner:false,
            isWritable:false
        },
        {
            pubkey:feePayer.publicKey,
            isSigner:true,
            isWritable:true
        },
    ]
    let amount = new Amount({amount:numerbOfTokes})
    // &token_program_id.key,
    // &source_token_account.key,
    // &destination_token_account.key,
    // &authority_id.key,
    // &[authority_id.key],
    // amount)?;
    const programId = new solanaweb3.PublicKey("8f4tWJU1kVofUAJVey17yv5jif57GxsHbBTaRd2qmk8");

    const serialized_amount = borsh.serialize(ammountSchema,amount);
    const ti = new solanaweb3.TransactionInstruction({
        keys:accounts,
        programId:programId,
        data: Buffer.from([4,...Buffer.from(serialized_amount)])


    })
    const transaction = new solanaweb3.Transaction().add(ti);
    const signature = await solanaweb3.sendAndConfirmTransaction(connection, transaction, [feePayer]).catch((err:any) =>{
        console.log(err);
    });
    
    console.log(signature);




}


// client();
// addEmployee(4, "Govind", "mdclkmd", 0);
 // getEmployeeDetails();
 // updateEmployees(1,5);
 // deleteData();
 //createTokens(1000)
 transferTokens(50)