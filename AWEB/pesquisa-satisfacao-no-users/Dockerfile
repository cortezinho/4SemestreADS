# Estágio 1: Build da aplicação com Maven
FROM maven:3-eclipse-temurin-21 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de build e o código-fonte. Copiar o pom.xml primeiro otimiza o cache do Docker.
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src

# Executa o build do Maven para gerar o .jar, pulando os testes para agilizar
RUN mvn package -DskipTests

# Estágio 2: Criação da imagem final, que é muito mais leve
FROM eclipse-temurin:21-jre-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia o .jar gerado no estágio anterior para a imagem final e renomeia para app.jar
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta 8080
EXPOSE 8080

# Comando para executar a aplicação quando o container iniciar
ENTRYPOINT ["java","-jar","/app/app.jar"]