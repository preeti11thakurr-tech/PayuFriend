console.log("THIS IS MY APP");
import axios from "axios";
import { useState, useEffect } from "react";
function App() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState(0);
  const [toEmail, setToEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [amount, setAmount] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const handleSignup = async () => {

    const response = await axios.post(
      "http://localhost:5000/signup",
      {
        name,
        email,
        password
      }
    );

    alert(response.data.message);
  };

  //handlelogin
  const handleLogin = async () => {
  try {

    const response = await axios.post(
      "http://localhost:5000/login",
      {
        email: loginEmail,
        password: loginPassword
      }
    );

    localStorage.setItem("token", response.data.token);
    setIsLoggedIn(true);
    alert("Login Successful");

  } catch (error) {

    alert(error.response.data.message);

  }
};

//get profile
const getProfile = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    "http://localhost:5000/profile",
    {
      headers: {
        authorization: token
      }
    }
  );

  setProfile(response.data);
};
//get balance
const getBalance = async () => {

  const response = await axios.get(
    `http://localhost:5000/balance?email=${loginEmail}`
  );

  setBalance(response.data.balance);
};


//gettransaction
const getTransactions = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    "http://localhost:5000/transactions",
    {
      headers: {
        authorization: token
      }
    }
  );
   //console.log(response.data);
  setTransactions(response.data);
};

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    setIsLoggedIn(true);
  }
}, []);

useEffect(() => {

  if (isLoggedIn) {
    getProfile();
    getBalance();
    getTransactions();
  }

}, [isLoggedIn]);


//transfer
const handleTransfer = async () => {
const token = localStorage.getItem("token");
  try {

    await axios.post(
      "http://localhost:5000/transfer",
      {
        fromEmail: loginEmail,
        toEmail,
        amount: Number(amount)
      },
      {
      headers:{
        authorization:token
      }
    }
    );

    alert("Transfer Successful");
          getBalance();
          getTransactions();
          
          setToEmail("");
          setAmount("");

  } catch (error) {

    alert(error.response.data.message);

  }
};
//handle logout
  const handleLogout = () => {

  localStorage.removeItem("token");

  setIsLoggedIn(false);

  setProfile(null);
  setBalance(0);
  setTransactions([]);

  alert("Logged Out");

};
 
 return (
  <div
    style={{
      minHeight: "200vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0f172a"
    }}
  >

    <div
      style={{
        backgroundColor: "linear-gradient(135deg,#1e293b,#334155",
        padding: "30px",
        borderRadius: "20px",
        width: "420px",
        maxWidth:"95%",
        textAlign: "center",
        color:"white",
        boxShadow:"1px 17px 50px rgba(1,1,1,4)"
      }}
    >

      <h1
      
      style={{
    color: "#60a5fa",
    marginBottom: "20px",
      }}
    >
      💸 Payufriend App
      </h1>
      <p
      style={{
              color: "#94a3b8",
              marginTop: "-10px",
              marginBottom: "25px"
             }}
      >
              Send money instantly and securely
      </p>
    
     

      {!isLoggedIn && (
        <>

          <h2>Signup</h2>

          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            style={{
                    width: "90%",
                    padding: "12px",
                    borderRadius: "12px",
                    border: "1px solid #475569",
                    background: "#0f172a",
                      color: "white"
                  }}
          />

          <br /><br />

          <input
            type="email"
             value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{
                    width: "90%",
                    padding: "12px",
                    borderRadius: "12px",
                    border: "1px solid #475569",
                    background: "#0f172a",
                    color: "white"
                  }}
          />

          <br /><br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
                    width: "90%",
                    padding: "12px",
                    borderRadius: "12px",
                    border: "1px solid #475569",
                    background: "#0f172a",
                    color: "white"
                  }}
          />

          <br /><br />

          <button onClick={handleSignup}
          style={{
              padding: "10px 20px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer"
               }}>
            Signup
          </button>

          <hr />
           <div
           style={{
          margin: "25px 0",
           color: "#64748b"
                }}
           >
  ───── OR ─────
</div>
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setLoginEmail(e.target.value)}
          />

          <br /><br />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          <br /><br />

          <button 
          onClick={handleLogin}
          style={{
              padding: "10px 20px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer"
               }}
              >
              
            Login
          </button>

        </>
      )}

      {isLoggedIn && (
        <>

         <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  }}
>
  <div>
    <h2 style={{ margin: 0 }}>
      Dashboard
    </h2>

    <p
      style={{
        margin: 0,
        color: "#94a3b8"
      }}
    >
      Manage your wallet
    </p>
  </div>

  <div
    style={{
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      background: "#7c3aed",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold"
    }}
  >
    👤
  </div>
</div>

          
          {profile && (
  <div
    style={{
      background: "#1e293b",
      padding: "18px",
      borderRadius: "18px",
      marginBottom: "20px",
      textAlign: "left",
      border: "1px solid #334155"
    }}
  >
    <p
      style={{
        margin: 0,
        color: "#94a3b8"
      }}
    >
      Welcome Back 👋
    </p>

    <h3
      style={{
        marginTop: "8px",
        marginBottom: "5px"
      }}
    >
      {profile.name}
    </h3>

    <p
      style={{
        margin: 0,
        color: "#cbd5e1"
      }}
    >
      {profile.email}
    </p>
  </div>
 )}

          <br /><br />

         

          <div
  style={{
    background: "linear-gradient(135deg,#312e81,#6d28d9)",
    padding: "25px",
    borderRadius: "20px",
    marginTop: "20px",
    marginBottom: "20px",
    color: "white",
    textAlign: "left"
  }}
>
  <p
    style={{
      margin: 0,
      opacity: 0.8
    }}
  >
    Wallet Balance
  </p>

  <h1
    style={{
      marginTop: "10px",
      marginBottom: "20px"
    }}
  >
    ₹{balance}
  </h1>

  <div
    style={{
      display: "flex",
      gap: "10px"
    }}
  >
    <div
      style={{
        flex: 1,
        background: "rgba(255,255,255,0.1)",
        padding: "10px",
        borderRadius: "12px"
      }}
    >
      <p>Sent</p>
      <h3>-₹0</h3>
    </div>

    <div
      style={{
        flex: 1,
        background: "rgba(255,255,255,0.1)",
        padding: "10px",
        borderRadius: "12px"
      }}
    >
      <p>Received</p>
      <h3>+₹0</h3>
    </div>

  </div>
 </div>
              {transactions.map((txn, index) => (
  <div
    key={index}
    style={{
      background: "#1e293b",
      padding: "15px",
      borderRadius: "15px",
      marginBottom: "12px",
      textAlign: "left",
      border: "1px solid #334155"
    }}
  >
    <p
      style={{
        margin: 0,
        color: "#94a3b8",
        fontSize: "13px"
      }}
    >
      Sent To
    </p>

    <h4
      style={{
        marginTop: "5px",
        marginBottom: "10px"
      }}
    >
      {txn.toUser}
    </h4>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <span style={{ color: "#22c55e" }}>
        ₹{txn.amount}
      </span>

      <span
        style={{
          background: "#22c55e",
          color: "black",
          padding: "4px 8px",
          borderRadius: "10px",
          fontSize: "12px"
        }}
      >
        Success
      </span>
    </div>
  </div>
))}
    
          <hr />

          <div
  style={{
    background: "#1e1b4b",
    padding: "20px",
    borderRadius: "20px",
    marginTop: "20px",
    marginBottom: "20px",
    border: "1px solid #4338ca"
  }}
>
  <h2>Transfer Money</h2>

  <input
    type="email"
    value={toEmail}
    placeholder="Receiver Email"
    onChange={(e) => setToEmail(e.target.value)}
    style={{
      width: "90%",
      padding: "14px",
      borderRadius: "12px",
      border: "1px solid #475569",
      background: "#312e81",
      color: "white"
    }}
  />

  <br /><br />

  <input
    type="number"
    value={amount}
    placeholder="Amount"
    onChange={(e) => setAmount(e.target.value)}
    style={{
      width: "90%",
      padding: "14px",
      borderRadius: "12px",
      border: "1px solid #475569",
      background: "#312e81",
      color: "white"
    }}
  />

  <br /><br />

   <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      marginBottom: "15px"
    }}
  >
    <button onClick={() => setAmount(500)}>₹500</button>
    <button onClick={() => setAmount(1000)}>₹1K</button>
    <button onClick={() => setAmount(2000)}>₹2K</button>
   </div>

  <button
    onClick={handleTransfer}
    style={{
      width: "100%",
      padding: "14px",
      borderRadius: "12px",
      border: "none",
      background: "linear-gradient(135deg,#7c3aed,#9333ea)",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer"
    }}
  >
    Send
  </button>

</div>
          

          <br /><br />

          <button onClick={handleLogout}
          style={{
           width: "90%",
           padding: "12px",
           borderRadius: "10px",
           border: "1px solid #475569",
           marginBottom: "10px"
}}>
            Logout
          </button>

        </>
      )}

    </div>

  </div>
);


  
}

export default App;


