# Omnix

### AI-Assisted API Discovery, Security Testing & Vulnerability Analysis

> **Project status:** Tentative / v0.1 planning  
> **Type:** Final Year Project (FYP)

## 1. Overview

Omnix is a proposed API security testing platform that aims to help developers and security testers discover APIs, understand their structure and authentication requirements, run controlled security tests, analyze the resulting evidence, and generate understandable vulnerability reports.

The central idea is a **hybrid approach**:

- deterministic security checks perform the actual requests/tests;
- an AI-assisted layer helps understand API context, prioritize/select useful tests, analyze structured evidence, and explain findings;
- a web dashboard presents scan progress, discovered endpoints, vulnerabilities, evidence, and reports.

The architecture and feature set are intentionally tentative and may change after research and experimentation.

## 2. Tentative MVP

The first working version should focus on:

1. Accepting a target API URL or OpenAPI/Swagger specification.
2. Discovering and storing API endpoints.
3. Supporting common authentication mechanisms such as:
   - Bearer/JWT tokens
   - API keys
   - Basic authentication
   - Cookies/session-based authentication
   - Custom headers
4. Providing a centralized request engine.
5. Running a small set of controlled security tests:
   - BOLA/IDOR
   - Broken authentication/authorization
   - Input validation/injection
   - Excessive data exposure
   - Security misconfiguration
   - CORS/security-header issues
   - Basic rate-limit checks
6. Storing request/response evidence and findings.
7. Displaying scan progress and results in a React dashboard.
8. Generating a basic report.
9. Adding AI-assisted analysis only after the deterministic pipeline works.

**Important:** Omnix is intended for authorized security testing only. Targets must be owned by the tester or explicitly authorized for testing.

## 3. Proposed Architecture

```text
                    ┌─────────────────────┐
                    │     React / Vite    │
                    │      Dashboard      │
                    └──────────┬──────────┘
                               │ REST / WebSocket
                               ▼
                    ┌─────────────────────┐
                    │   Node / Express    │
                    │    API Backend      │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼──────────────────┐
             ▼                 ▼                  ▼
      ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
      │ Discovery   │   │ Request/Test │   │ Scan/Workers │
      │ Engine      │   │ Engine       │   │              │
      └─────────────┘   └──────────────┘   └──────────────┘
             │                 │                  │
             └─────────────────┼──────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │ PostgreSQL / Prisma │
                    └─────────────────────┘

                 Later / Optional AI Service
                    ┌─────────────────────┐
                    │ Python / FastAPI    │
                    │ AI/ML + LLM Layer   │
                    └─────────────────────┘
```

A local browser/Node agent may be added later to support browser-observed API traffic and localhost/private development environments.

## 4. Tentative Technology Stack

### Frontend
- React
- Vite
- JavaScript or TypeScript
- Tailwind CSS or another lightweight UI system
- Socket.IO client for live scan updates

### Backend
- Node.js
- Express
- TypeScript
- REST API
- Socket.IO

### Data
- PostgreSQL
- Prisma ORM
- Redis + BullMQ if background jobs become necessary

### Security Testing
- Native Node HTTP tooling / fetch initially
- Dedicated request abstraction so the underlying HTTP implementation can be replaced later
- Modular security-test plugins

### AI
- Python
- FastAPI
- scikit-learn for classical ML experiments
- Local LLM/Ollama or another model if useful
- AI should initially analyze structured evidence rather than directly control unrestricted network requests

### DevOps
- Git + GitHub
- Docker / Docker Compose
- Environment variables for secrets

## 5. Suggested Repository Structure

```text
omnix/
├── apps/
│   ├── web/
│   │   └── ...
│   └── api/
│       └── ...
├── services/
│   └── ai/
│       └── ...
├── packages/
│   └── shared/
│       └── ...
├── docs/
│   ├── architecture/
│   ├── research/
│   └── threat-model/
├── tests/
├── docker/
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
└── README.md
```

The exact monorepo tooling can be chosen after the initial backend/frontend skeleton is running.

## 6. Development Principles

- Build the deterministic core before the AI layer.
- Keep discovery, requests, tests, evidence, and reporting modular.
- Never allow an AI component to bypass authorization or safety controls.
- Store enough evidence to reproduce and explain findings.
- Start with a small number of high-value vulnerability classes.
- Prefer an MVP that can be evaluated properly over a large collection of incomplete features.

## 7. Initial Development Milestone

The first milestone is intentionally simple:

```text
Target URL
   ↓
Create Scan
   ↓
Discover/enter Endpoint
   ↓
Send HTTP Request
   ↓
Capture Response
   ↓
Store Request + Response
   ↓
Display Result in Dashboard
```

Once this works reliably, add authentication handling, endpoint discovery, the first security test, findings, and then AI-assisted analysis.

## 8. Current Status

Omnix is currently in the planning/start-of-development phase. Features, architecture, technology choices, and AI methodology are **tentative** and will be validated through research and implementation.

## 9. License / Academic Use

This repository is intended for academic development and authorized security testing. Do not use Omnix against systems without permission.
