# Library Management System

A modern full-stack library management application with Rails backend and React frontend using Inertia.js, featuring role-based access control and a RESTful JSON API.

## Features

- [Inertia Rails](https://inertia-rails.dev) & [Vite Rails](https://vite-ruby.netlify.app) setup
- [React](https://react.dev) frontend with TypeScript & [shadcn/ui](https://ui.shadcn.com) component library
- User authentication system with role-based access (Librarian/Member)
- Book management with CRUD operations
- Borrowing and return system with due date tracking
- RESTful JSON API under `/api/v1` namespace
- Comprehensive test coverage with RSpec
- [Kamal](https://kamal-deploy.org/) for deployment
- Optional SSR support

See also:
- [Svelte Starter Kit](https://github.com/inertia-rails/svelte-starter-kit) for Inertia Rails with Svelte
- [Vue Starter Kit](https://github.com/inertia-rails/vue-starter-kit) for Inertia Rails with Vue

<a href="https://evilmartians.com/?utm_source=inertia-rails-react-starter-kit&utm_campaign=project_page">
<img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg" alt="Built by Evil Martians" width="236" height="54">
</a>

## Setup

1. Clone this repository
2. Setup dependencies & run the server:
   ```bash
   bin/setup
   ```
3. Run migrations and seed the database:
   ```bash
   rails db:migrate
   rails db:seed
   ```
4. Open http://localhost:3000

## Test Credentials

The application includes test users with different roles:

### Librarian Account
- **Email:** librarian@bookmanagement.com
- **Username:** librarian_1
- **Password:** password123456
- **Role:** Librarian (full access to books, members, and API)

### Member Accounts
- **Email:** member@bookmanagement.com
- **Username:** member_1
- **Password:** password123456
- **Role:** Member (can browse books and manage borrowings)

Additional test members with overdue books are created during seeding for testing purposes.

## API Documentation

The application provides a RESTful JSON API under the `/api/v1` namespace. Librarians can access the full API documentation at `/api_docs` after signing in.

### Available Endpoints

**Books**
- `GET /api/v1/books` - List all books (supports ?query and ?filter parameters)
- `GET /api/v1/books/:id` - Get a specific book
- `POST /api/v1/books` - Create a book (librarian only)
- `PATCH /api/v1/books/:id` - Update a book (librarian only)
- `DELETE /api/v1/books/:id` - Delete a book (librarian only)

**Borrowings**
- `GET /api/v1/borrowings` - List borrowings (supports ?filter=due_today|overdue)
- `POST /api/v1/borrowings` - Borrow a book (requires user_id and book_id)
- `PATCH /api/v1/borrowings/:id/return` - Mark a book as returned

**Members**
- `GET /api/v1/members` - List all members (librarian only, supports ?filter=overdue)

### Example API Request

```bash
# List all books
curl http://localhost:3000/api/v1/books

# Create a borrowing
curl -X POST http://localhost:3000/api/v1/borrowings \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1, "book_id": 1}'
```

## TODO

### High Priority
- [ ] Implement token-based authentication for API endpoints
- [ ] Add API rate limiting
- [ ] Add pagination to API responses

### Medium Priority
- [ ] Add email notifications for overdue books
- [ ] Implement book reservations system
- [ ] Add book cover image uploads
- [ ] Generate API usage statistics for librarians

### Low Priority
- [ ] Add book reviews and ratings
- [ ] Implement fine calculation for overdue books
- [ ] Add export functionality (CSV/PDF) for reports

## Enabling SSR

This starter kit comes with optional SSR support. To enable it, follow these steps:

1. Open `app/frontend/entrypoints/inertia.ts` and uncomment part of the `setup` function:
   ```ts
   // Uncomment the following to enable SSR hydration:
   // if (el.hasChildNodes()) {
   //   hydrateRoot(el, createElement(App, props))
   //   return
   // }
   ```
2. Open `config/deploy.yml` and uncomment several lines:
   ```yml
   servers:
     # Uncomment to enable SSR:
     # vite_ssr:
     #   hosts:
     #     - 192.168.0.1
     #   cmd: bundle exec vite ssr
     #   options:
     #     network-alias: vite_ssr

   # ...

   env:
     clear:
       # Uncomment to enable SSR:
       # INERTIA_SSR_ENABLED: true
       # INERTIA_SSR_URL: "http://vite_ssr:13714"

   # ...

   builder:
     # Uncomment to enable SSR:
     # dockerfile: Dockerfile-ssr
   ```

That's it! Now you can deploy your app with SSR support.

## License

The project is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
