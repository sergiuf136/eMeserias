import React from 'react';

const Login = (props) => {

    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        // handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError,
        confirmPassword,
        setConfirmPassword,
        handleSubmit,
        showAuth,
        setShowAuth,
        name,
        setName,
        setJob,
    } = props;

    if (showAuth)
        return (
            //<section className="login">
            <div className="loginContainer" >
                <span id='close' onClick={() => setShowAuth(!showAuth)} >închide fereastra</span>
                {!hasAccount &&
                    <>
                        <label>
                            <input type="radio" name="tipCont" value="meserias"
                                onClick={(e) => setJob(e.target.value)} />
                                <span>Meseriaș</span>

                            <input type="radio" name="tipCont" value="client"
                                onClick={(e) => setJob(e.target.value)} defaultChecked/>
                                <span>Client</span>
                        </label>

                        <label>Numele tău </label>
                        <input type="text"
                            required value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </>
                }
                
                
                
                <label> Email </label>
                <input type="text"
                    autoFocus required value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <p className="errorMsg"> {emailError} </p>
                <label> Parolă </label>
                <input type="password" required value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <p className="errorMsg" > {passwordError} </p>
                {!hasAccount &&
                    <>
                        <label>Confirmă parola </label>
                        <input type="password"
                            required value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                    </>
                }
                <div className="btnContainer">
                    {hasAccount ?
                        (
                            <>
                                <button onClick={handleLogin} > Autentificare </button>
                                <p > Nu ai cont?<span onClick={() => setHasAccount(!hasAccount)}>Fă-ți cont!</span></p>
                            </>
                        ) : (
                            <>
                                <button onClick={handleSubmit} > Creare cont </button>
                                <p > Ai cont? <span onClick={() => setHasAccount(!hasAccount)} > Autentifică-te! </span></p>
                            </>
                        )}
                </div>

            </div>
            //</section>
        )
    else {
        return null;
    }
}

export default Login;