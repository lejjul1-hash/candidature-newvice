body {
    margin: 0;
    background: #050506;
    color: #f2f2f7;
    font-family: Arial, sans-serif;
}

.container {
    max-width: 750px;
    margin: 40px auto;
    padding: 20px;
}

.title {
    text-align: center;
    font-size: 28px;
    margin-bottom: 25px;
    font-weight: 900;
    color: #ff4040;
    text-shadow: 0 0 15px #ff0000;
}

.card {
    background: #0e0e10;
    padding: 22px;
    border-radius: 12px;
    box-shadow: 0 0 25px rgba(255,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.03);
}

label {
    display: block;
    margin-top: 12px;
    margin-bottom: 5px;
    font-weight: 600;
}

input, textarea {
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    color: white;
    resize: none;
    outline: none;
}

textarea {
    height: 85px;
}

.btn, .btn-secondary {
    width: 100%;
    padding: 14px;
    margin-top: 18px;
    border: none;
    border-radius: 10px;
    font-size: 17px;
    cursor: pointer;
    font-weight: 700;
}

.btn {
    background: linear-gradient(90deg, #ff1e1e, #ff6b6b);
    color: white;
    box-shadow: 0 0 15px rgba(255,0,0,0.4);
}

.btn:hover {
    box-shadow: 0 0 25px rgba(255,0,0,0.8);
}

.btn-secondary {
    background: #222;
    color: #aaa;
}

.btns {
    display: flex;
    gap: 12px;
}

.radio-group input {
    margin-right: 6px;
}
