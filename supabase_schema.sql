-- Extended Supabase schema for AgroApp

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  role text default 'operario',
  created_at timestamptz default now()
);

create table if not exists establishments (
  id serial primary key,
  name text,
  location text,
  responsible text,
  created_at timestamptz default now()
);

create table if not exists fields (
  id serial primary key,
  establishment_id integer references establishments(id),
  name text,
  area numeric,
  created_at timestamptz default now()
);

create table if not exists crops (
  id serial primary key,
  name text,
  created_at timestamptz default now()
);

create table if not exists sowings (
  id serial primary key,
  field_id integer references fields(id),
  crop_id integer references crops(id),
  sowed_at date,
  variety text,
  density numeric,
  created_at timestamptz default now()
);

create table if not exists stock_movements (
  id serial primary key,
  product_name text,
  product_type text,
  type text, -- entry / exit
  quantity numeric,
  unit text,
  establishment_id integer references establishments(id),
  note text,
  created_at timestamptz default now()
);

create table if not exists applications (
  id serial primary key,
  field_id integer references fields(id),
  user_id uuid references users(id),
  products jsonb,
  notes text,
  photo_url text,
  created_at timestamptz default now()
);

create table if not exists animals (
  id serial primary key,
  tag text,
  category text,
  establishment_id integer references establishments(id),
  birth_date date,
  notes text,
  created_at timestamptz default now()
);

create table if not exists machine (
  id serial primary key,
  name text,
  type text,
  hours numeric,
  establishment_id integer references establishments(id),
  created_at timestamptz default now()
);

create table if not exists machine_usage (
  id serial primary key,
  machine_id integer references machine(id),
  field_id integer references fields(id),
  user_id uuid references users(id),
  date timestamptz,
  hours numeric,
  fuel_liters numeric,
  note text,
  created_at timestamptz default now()
);

create table if not exists tasks (
  id serial primary key,
  title text,
  description text,
  assigned_to uuid references users(id),
  field_id integer references fields(id),
  status text default 'pending', -- pending / in_progress / done
  due_date date,
  created_at timestamptz default now()
);

create table if not exists expenses (
  id serial primary key,
  establishment_id integer references establishments(id),
  category text,
  amount numeric,
  currency text default 'ARS',
  date date,
  note text,
  created_at timestamptz default now()
);
