# ───────────────────────────────────────────────
# 1) Builder Stage
# ───────────────────────────────────────────────
FROM node:18-alpine AS builder

#Working directory
WORKDIR /app

# Copy only package files for caching
COPY package*.json ./

# Install all dependencies (dev + prod)
RUN npm install

# Copy the source code
COPY . .

# Build the Next.js app
RUN npm run build

# ───────────────────────────────────────────────
# 2) Runner Stage (Production image)
# ───────────────────────────────────────────────
FROM gcr.io/distroless/nodejs18

#Working Directory
WORKDIR /app

ENV NODE_ENV=production

# Only copy necessary files from builder
COPY --from=builder /app/.next/standalone ./

# Copy static assets
COPY --from=builder /app/.next/static ./public/_next/static

# Copy public folder
COPY --from=builder /app/public ./public

# Expose Next.js port
EXPOSE 3000

# Start Next.js
CMD ["server.js"]