from flask import Flask, render_template, redirect, url_for, request, flash
from database import init_db, get_db, add_user, add_product, get_user_by_username
import hashlib

app = Flask(__name__)
app.secret_key = 's3cr3tk3y'

# Inicializa o banco de dados
init_db()

# Rota de login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        # Verifica se o usuário existe e a senha está correta
        user = get_user_by_username(username)
        if user and check_password_hash(user['password'], password):
            return redirect(url_for('dashboard'))
        else:
            flash('Usuário ou senha inválidos', 'danger')
    return render_template('login.html')

# Rota de cadastro de usuário
@app.route('/cadastro', methods=['GET', 'POST'])
def register_user():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        hashed_password = hash_password(password)
        
        if get_user_by_username(username):
            flash('Usuário já existe!', 'danger')
            return redirect(url_for('register_user'))
        
        add_user(username, hashed_password)
        flash('Cadastro realizado com sucesso!', 'success')
        return redirect(url_for('login'))
    
    return render_template('register_user.html')

# Rota de cadastro de produto
@app.route('/produto', methods=['GET', 'POST'])
def register_product():
    if request.method == 'POST':
        name = request.form['name']
        price = float(request.form['price'])
        description = request.form['description']
        
        add_product(name, price, description)
        flash('Produto cadastrado com sucesso!', 'success')
        return redirect(url_for('register_product'))
    
    return render_template('register_product.html')

# Rota do dashboard
@app.route('/dashboard')
def dashboard():
    return "Bem-vindo ao dashboard!"

# Função para verificar a senha (hash)
def check_password_hash(stored_hash, password):
    return stored_hash == hashlib.sha256(password.encode()).hexdigest()

# Função para criar o hash da senha
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

if __name__ == '__main__':
    app.run(debug=True)
