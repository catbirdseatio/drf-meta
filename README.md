# DRF-META

## A Django and React starter project for you!

- [Djoser](https://djoser.readthedocs.io/en/latest/)
- [pytest-django](https://pytest-django.readthedocs.io/en/latest/)
- [SimpleJWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)
- [React Router](https://reactrouter.com/en/main)
- [TypeScript](https://www.typescriptlang.org/)
- [React Hook Form](https://react-hook-form.com/)


Coming Soon:

- [Tanstack Query](https://tanstack.com/query/latest)
- [TailwindCSS](https://tailwindcss.com/docs/guides/vite)
- [Vitest](https://vitest.dev/)


## Installation

### Backend 

    python3 -m venv venv
    source venv/bin/activate
    cd backend
    pip install -r requirements.txt
    python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())' >> .env
    python manage.py migrate
    python manage.py runserver


### Frontend
    cd frontend
    npm i
    echo VITE_BASE_URL=http://127.0.0.1:8000/api >> .env
    npm run dev