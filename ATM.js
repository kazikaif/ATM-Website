let Balance = 25000;
let Pin = "2653";

const pin = document.querySelector(".pin");
const Pinchange = document.querySelector("#Pinchange");

const confirmBtn = document.querySelector(".confirm");

const inputs = document.querySelectorAll(".pin-inputs input");
const welcomeContainer = document.querySelector(".welcome");
const D2 = document.querySelector(".D2");

const checkBalance = document.querySelector("#btnBalance");
const Withdrawl = document.querySelector("#withdrawl");
const Deposit = document.querySelector("#deposit");

const transactionHistory = [];

const transactionBtn = document.querySelector("#Transaction");

const HomeBtn = document.querySelector("#Home");

HomeBtn.addEventListener("click", () => {
  welcomeContainer.innerHTML = `
    <div class="welcome">
      <h1>Welcome in ATM</h1>
      <h1>Select Your Operation </h1>
     </div>
     <div class="welcome">
     </div>
  `;
});

inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    if (input.value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && input.value === "" && index > 0) {
      inputs[index - 1].focus();
    }
  });
});

inputs[0].focus();

confirmBtn.addEventListener("click", () => {
  let enteredPin = "";
  inputs.forEach((input) => {
    enteredPin += input.value;
  });

  if (enteredPin === Pin) {
    welcomeContainer.innerHTML = `
        <div class="welcome">
          <h1>Hello Welcome</h1>
          <h2>Select Your Operation</h2>
          </div>
          
      `;
    D2.appendChild(welcomeContainer);

    checkBalance.addEventListener("click", () => {
      welcomeContainer.innerHTML = `
          <div class="with">
            <h2>Balance: ₹${Balance}</h2>
          </div>
        `;
    });

    transactionBtn.addEventListener("click", () => {
      if (transactionHistory.length === 0) {
        welcomeContainer.innerHTML = `
          <div class="welcome">
            <h2>No Transaction Yet</h2>
          </div>`;
      } else {
        let tableRows = transactionHistory
          .map(
            (t) => `
            <tr><td>${t.type}</td>
            <td>₹${t.amount}</td>
            <td>${t.time}</td> </tr>`
          )
          .join("");

        welcomeContainer.innerHTML = `
                  <div class="welcome">
                          <h2>Transaction History</h2>
  <table border="1" cellpadding="10" cellspacing="0" style="margin-top: 10px; margin-left: 50px; width: 80%; text-align: center;">
            <thead style="background-color: #ddd;">
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </div>
    `;
      }
    });

    Withdrawl.addEventListener("click", () => {
      welcomeContainer.innerHTML = `
          <div class="with">
            <input type="number" id="withdrawInput" placeholder="Enter Amount"><br>
            <button id="confirmWithdraw">Withdraw</button>
          </div>
        `;
      const confirmWithdraw = document.querySelector("#confirmWithdraw");
      confirmWithdraw.addEventListener("click", () => {
        const amount = parseInt(document.querySelector("#withdrawInput").value);
        if (amount > Balance) {
          alert("Insufficient Balance");
        } else {
          Balance -= amount;
          transactionHistory.push({
            type: "Withdrawl",
            amount,
            time: new Date().toLocaleString(),
          });
          welcomeContainer.innerHTML = `
              <div class="with">
                <h2>Withdrawal Successful</h2>
              </div>
            `;
        }
      });
    });

    Deposit.addEventListener("click", () => {
      welcomeContainer.innerHTML = `
          <div class="with">
            <input type="number" id="depositInput" placeholder="Enter Amount"><br>
            <button id="confirmDeposit">Deposit</button>
          </div>
        `;
      const confirmDeposit = document.querySelector("#confirmDeposit");
      confirmDeposit.addEventListener("click", () => {
        const amount = parseInt(document.querySelector("#depositInput").value);
        if (isNaN(amount) || amount <= 0) {
          alert("Enter a valid amount");
        } else {
          Balance += amount;
          transactionHistory.push({
            type: "Deposit",
            amount,
            time: new Date().toLocaleString(),
          });

          welcomeContainer.innerHTML = `
              <div class="with">
                <h2>Deposit Successful</h2>
              </div>
            `;
        }
      });
    });
  } else {
    alert("Incorrect PIN. Please try again.");

    inputs.forEach((input) => (input.value = ""));

    inputs[0].focus();
  }
});

Pinchange.addEventListener("click", () => {
  welcomeContainer.innerHTML = `
      <div class="pin">
        <label>Enter Your Previous PIN</label>
        <form class="pin-inputs" id="oldPinForm">
          <input type="password" maxlength="1" />
          <input type="password" maxlength="1" />
          <input type="password" maxlength="1" />
          <input type="password" maxlength="1" />
        </form>

        <label>Enter Your New PIN</label>
        <form class="pin-inputs" id="newPinForm">
          <input type="password" maxlength="1" />
          <input type="password" maxlength="1" />
          <input type="password" maxlength="1" />
          <input type="password" maxlength="1" />
        </form>

        <button class="confirm" id="ChangePin">Confirm</button>
      </div>
    `;

  const oldPinInputs = document.querySelectorAll("#oldPinForm input");
  const newPinInputs = document.querySelectorAll("#newPinForm input");

  oldPinInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value.length === 1 && index < oldPinInputs.length - 1) {
        oldPinInputs[index + 1].focus();
      }
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && input.value === "" && index > 0) {
        oldPinInputs[index - 1].focus();
      }
    });
  });

  newPinInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value.length === 1 && index < newPinInputs.length - 1) {
        newPinInputs[index + 1].focus();
      }
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && input.value === "" && index > 0) {
        newPinInputs[index - 1].focus();
      }
    });
  });

  oldPinInputs[0].focus();

  const ChangePin = document.querySelector("#ChangePin");
  ChangePin.addEventListener("click", () => {
    let oldPin = "",
      newPin = "";
    oldPinInputs.forEach((input) => (oldPin += input.value));
    newPinInputs.forEach((input) => (newPin += input.value));

    if (oldPin === Pin) {
      Pin = newPin;
      welcomeContainer.innerHTML = `
          <div class="with">
            <h2>PIN Changed Successfully</h2>
          </div>
        `;
    } else {
      alert("Incorrect Previous PIN");
    }
  });
});
