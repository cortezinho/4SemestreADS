import sqlite3

DATABASE = 'app.db'

# Função para inicializar o banco de dados
def init_db():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL)''')
    c.execute('''CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    price REAL NOT NULL,
                    description TEXT)''')
    conn.commit()
    conn.close()

# Função para obter o banco de dados
def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Função para adicionar um usuário
def add_user(username, password):
    conn = get_db()
    c = conn.cursor()
    c.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, password))
    conn.commit()
    conn.close()

# Função para adicionar um produto
def add_product(name, price, description):
    conn = get_db()
    c = conn.cursor()
    c.execute('INSERT INTO products (name, price, description) VALUES (?, ?, ?)', (name, price, description))
    conn.commit()
    conn.close()

# Função para buscar um usuário pelo nome
def get_user_by_username(username):
    conn = get_db()
    c = conn.cursor()
    c.execute('SELECT * FROM users WHERE username = ?', (username,))
    user = c.fetchone()
    conn.close()
    return user
