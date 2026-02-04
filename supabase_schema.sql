-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES TABLE
-- Links to Supabase Auth users
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PROJECTS TABLE
-- Where founders register their websites
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  domain text,
  slug text unique not null,
  -- Widget customization fields
  widget_primary_color text default '#000000',
  widget_bg_color text default '#ffffff',
  widget_text_color text default '#000000',
  widget_border_radius text default '16',
  widget_width integer default 380,
  widget_height integer default 420,
  widget_open_animation text default 'fade',
  widget_close_animation text default 'fade',
  widget_show_once_session boolean default false,
  widget_device_target text default 'all',
  widget_position text default 'bottom-right',
  widget_theme text default 'light',
  widget_title text default 'How was your experience?',
  widget_subtitle text default 'Help us improve this project.',
  widget_button_text text default 'Submit Feedback',
  widget_success_title text default 'Thank you!',
  widget_success_message text default 'Your feedback helps us grow.',
  widget_show_branding boolean default true,
  widget_trigger_delay integer default 5,
  widget_trigger_scroll integer default 50,
  -- Tracking
  widget_connected boolean default false,
  widget_last_ping timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- REVIEWS TABLE
-- To store incoming feedback
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  rating int check (rating >= 1 and rating <= 5) not null,
  content text not null,
  customer_name text,
  status text check (status in ('pending', 'approved')) default 'pending' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ROW LEVEL SECURITY (RLS)
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.reviews enable row level security;

-- POLICIES

-- Profiles: Users can only see/edit their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Projects: Users can only see/edit projects they own
create policy "Users can view own projects" on public.projects
  for select using (auth.uid() = owner_id);

-- Allow widget to read project settings (public read for widget customization)
create policy "Public can read project widget settings" on public.projects
  for select using (true);

create policy "Users can insert own projects" on public.projects
  for insert with check (auth.uid() = owner_id);

create policy "Users can update own projects" on public.projects
  for update using (auth.uid() = owner_id);

-- Allow widget to update connection status
create policy "Public can update project widget status" on public.projects
  for update using (true)
  with check (true);

create policy "Users can delete own projects" on public.projects
  for delete using (auth.uid() = owner_id);

-- Reviews: Users can see reviews for their projects
-- (Note: This requires a join or a subquery to check project ownership)
create policy "Users can view reviews for their projects" on public.reviews
  for select using (
    exists (
      select 1 from public.projects
      where projects.id = reviews.project_id
      and projects.owner_id = auth.uid()
    )
  );

-- Allow anyone to insert reviews (Public submission)
-- But they cannot read them unless they are the owner
create policy "Public can insert reviews" on public.reviews
  for insert with check (true);

-- Users can update status of reviews for their projects
create policy "Users can update reviews for their projects" on public.reviews
  for update using (
    exists (
      select 1 from public.projects
      where projects.id = reviews.project_id
      and projects.owner_id = auth.uid()
    )
  );

-- Trigger to create profile on signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
