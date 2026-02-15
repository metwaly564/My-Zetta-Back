# Use Node.js base image
FROM node:20-slim AS builder

# Install openssl for Prisma
RUN apt-get update -y && apt-get install -y openssl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code and prisma schema
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image
FROM node:20-slim AS runner

# Install openssl for Prisma
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Copy from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
