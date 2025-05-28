# Feresegna Bus - Full Stack Application

A comprehensive bus booking system built with Next.js, FastAPI, PostgreSQL, and Nginx.

## 🏗️ Architecture

\`\`\`
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │    │    Nginx    │    │   Backend   │    │ PostgreSQL  │
│  (Next.js)  │◄──►│ (Reverse    │◄──►│  (FastAPI)  │◄──►│ (Database)  │
│             │    │  Proxy)     │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
\`\`\`

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for development)
- Python 3.11+ (for development)

### Production Deployment

1. **Clone the repository:**
   \`\`\`bash
   git clone <repository-url>
   cd feresegna-bus
   \`\`\`

2. **Configure environment:**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`

3. **Deploy with Docker:**
   \`\`\`bash
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   \`\`\`

4. **Access the application:**
   - Frontend: http://localhost
   - API Documentation: http://localhost/api/docs

### Development Setup

1. **Start development environment:**
   \`\`\`bash
   chmod +x scripts/dev.sh
   ./scripts/dev.sh
   \`\`\`

2. **Access development servers:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres123@localhost:5432/feresegna_bus` |
| `JWT_SECRET_KEY` | Secret key for JWT tokens | `your-super-secret-jwt-key-change-in-production` |
| `NEXT_PUBLIC_API_URL` | Frontend API URL | `http://localhost/api` |
| `CORS_ORIGINS` | Allowed CORS origins | `http://localhost,http://localhost:3000,http://localhost:80` |

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | password |
| Operator | operator@example.com | password |
| Driver | driver@example.com | password |
| Passenger | passenger@example.com | password |

## 📁 Project Structure

\`\`\`
feresegna-bus/
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                   # Utilities and API client
├── context/               # React contexts
├── backend/               # FastAPI backend
├── nginx.conf             # Nginx configuration
├── docker-compose.yml     # Docker services
├── scripts/               # Deployment scripts
└── README.md
\`\`\`

## 🛠️ Development

### Frontend Development

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
\`\`\`

### Backend Development

\`\`\`bash
# Install dependencies
cd backend
pip install -r requirements.txt

# Start development server
uvicorn main:app --reload

# Run tests
pytest
\`\`\`

### Database Management

\`\`\`bash
# Start database only
docker-compose up -d postgres

# Access database
docker-compose exec postgres psql -U postgres -d feresegna_bus

# View logs
docker-compose logs postgres
\`\`\`

## 🔍 Monitoring

### Health Checks

- Frontend: http://localhost/health
- Backend: http://localhost:8000/health
- Database: Automatic Docker health checks

### Logs

\`\`\`bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f nginx
docker-compose logs -f backend
docker-compose logs -f postgres
\`\`\`

## 🚦 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Trips
- `GET /api/trips/search` - Search trips
- `GET /api/trips/popular` - Get popular trips
- `GET /api/trips/{id}` - Get trip details

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user` - Get user bookings
- `POST /api/bookings/{id}/cancel` - Cancel booking

### Admin
- `GET /api/operators` - List operators
- `POST /api/operators` - Create operator
- `PUT /api/operators/{id}` - Update operator

## 🔒 Security

- JWT token authentication
- CORS protection
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection headers

## 📈 Performance

- Nginx reverse proxy
- Static file caching
- API response caching
- Database connection pooling
- Gzip compression

## 🐛 Troubleshooting

### Common Issues

1. **Services not starting:**
   \`\`\`bash
   docker-compose down --remove-orphans
   docker-compose up -d --force-recreate
   \`\`\`

2. **Database connection issues:**
   \`\`\`bash
   docker-compose logs postgres
   docker-compose restart postgres
   \`\`\`

3. **API not responding:**
   \`\`\`bash
   docker-compose logs backend
   docker-compose restart backend
   \`\`\`

### Reset Everything

\`\`\`bash
docker-compose down -v
docker system prune -f
./scripts/deploy.sh
\`\`\`

## 📝 License

This project is licensed under the MIT License.
