##################################
# BASE
##################################

FROM node:16.14.2 AS base

ARG PORT=3000
ARG NODE_ENV=production

ENV PORT ${PORT}

LABEL org.opencontainers.image.source https://github.com/iacobfred/portfolio

##################################
# BUILDER
##################################

FROM base AS builder

ARG NODE_ENV

ENV NODE_OPTIONS --max_old_space_size=4096
ENV PORT 3000

# Define the working directory of the container.
WORKDIR /app

# Copy package.json and package-lock.json to the container.
COPY package*.json ./

# Install dependencies, always including dev dependencies so the project can be built.
RUN NODE_ENV=development npm ci

ENV PATH /app/node_modules/.bin:$PATH

# Build app.
COPY . .
RUN NODE_ENV=${NODE_ENV} npm run build

##################################
# RUNNER
##################################

FROM base as runner

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

# Define the working directory of the container.
WORKDIR /app

# Copy compiled JavaScript from the builder stage.
COPY --from=builder /app/.next ./.next
COPY public ./public
COPY package*.json ./
COPY next.config.js ./

RUN npm ci

ENV PATH /app/node_modules/.bin:$PATH

RUN chown -R www-data:www-data ./.next
# chmod g+w -R ./.next

# Expose Next.js web application port.
EXPOSE ${PORT}

# Switch to non-root user.
USER www-data

# Define health check.
HEALTHCHECK --interval=30s --timeout=7s --start-period=60s --retries=3 \
  CMD curl --fail http://localhost:${PORT}/ || exit 1

# Start the app.
CMD ["npm", "run", "start"]
