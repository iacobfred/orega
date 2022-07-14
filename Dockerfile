##################################
# BASE
##################################

FROM node:16 AS base

ENV PORT 3000

ARG NODE_ENV=development

# ARG DATABASE_URL="postgresql://postgres:password@localhost:5432/db?schema=public&sslmode=prefer"
# ENV DATABASE_URL $DATABASE_URL

# Create app directory.
RUN mkdir -p /app

# Define the working directory of the container.
WORKDIR /app

##################################
# BUILDER
##################################

FROM base AS builder

# Copy package.json and package-lock.json to the container.
COPY package*.json /app/

# Install dependencies.
# TODO: remove --force
RUN npm set cache .npm; npm ci || (npm cache clean -f && npm ci --force) || (npm i --force)

# Copy source files.
COPY . /app

# Build app.
RUN npm run build

##################################
# RUNNER
##################################

FROM base

# Copy the ENVIRONMENT arg from the previous stage.
ARG NODE_ENV

# Create app directory.
RUN mkdir -p /app

# Define the working directory of the container.
WORKDIR /app

# Copy compiled JavaScript from the builder stage.
COPY --from=builder /app/.next /app/.next

# Copy prisma schema and migrations from the builder stage.
COPY --from=builder /app/prisma /app/

# Install firebase tools.
RUN npm i -g firebase-tools

# Install required dependencies, and if in dev mode, make the build directory writable.
COPY package*.json /app/
RUN if [ "$NODE_ENV" = "development" ]; then npm ci --cache .npm; chmod g+w -R /app/.next/; else npm ci --cache .npm --production; fi

# Expose Next.js web application port.
EXPOSE 3000

# Expose Node.js debug port.
EXPOSE 9229

# Switch to non-root user.
USER www-data

# Define health check.
HEALTHCHECK --interval=30s --timeout=7s --start-period=60s --retries=3 \
  CMD curl --fail http://localhost:3000/ || exit 1

# Start the app.
# CMD ["npm", "run", "start:migrate"]
CMD ["npm", "run", "start"]