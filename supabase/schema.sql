-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.menus (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  category_id smallint,
  name character varying,
  price numeric,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT menus_pkey PRIMARY KEY (id),
  CONSTRAINT menus_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.menu_categories(id)
);
CREATE TABLE public.menu_categories (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT menu_categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.floors (
  id uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  name character varying NOT NULL,
  width smallint NOT NULL,
  height smallint NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT floors_pkey PRIMARY KEY (id)
);

CREATE TABLE public.restaurant_tables (
  id uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  floor_id uuid NOT NULL,
  name character varying NOT NULL,
  capacity smallint NOT NULL DEFAULT 1,
  status character varying NOT NULL DEFAULT 'available' CHECK (status::text = ANY (ARRAY['available'::character varying, 'occupied'::character varying, 'reserved'::character varying]::text[])),
  position_x smallint NOT NULL DEFAULT 0,
  position_y smallint NOT NULL DEFAULT 0,
  width smallint NOT NULL DEFAULT 100,
  height smallint NOT NULL DEFAULT 100,
  shape character varying NOT NULL DEFAULT 'rectangle' CHECK (shape::text = ANY (ARRAY['rectangle'::character varying, 'circle'::character varying, 'square'::character varying]::text[])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT restaurant_tables_pkey PRIMARY KEY (id),
  CONSTRAINT restaurant_tables_floor_id_fkey FOREIGN KEY (floor_id) REFERENCES public.floors(id)
);

CREATE TABLE public.tables (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL UNIQUE,
  status character varying DEFAULT '''available'''::character varying,
  width smallint,
  height smallint,
  x smallint,
  y smallint,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT tables_pkey PRIMARY KEY (id)
);
CREATE TABLE public.table_locations (
  id smallint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT table_locations_pkey PRIMARY KEY (id)
);
CREATE TABLE public.table_features (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  detail_id smallint,
  name character varying,
  description character varying,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone,
  CONSTRAINT table_features_pkey PRIMARY KEY (id),
  CONSTRAINT table_features_detail_id_fkey FOREIGN KEY (detail_id) REFERENCES public.table_details(id)
);
CREATE TABLE public.table_images (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  detail_id bigint,
  image_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT table_images_pkey PRIMARY KEY (id),
  CONSTRAINT table_images_detail_id_fkey FOREIGN KEY (detail_id) REFERENCES public.table_details(id)
);
CREATE TABLE public.table_details (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  table_id bigint NOT NULL,
  location_id smallint,
  size_id smallint,
  capacity smallint,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT table_details_pkey PRIMARY KEY (id),
  CONSTRAINT table_details_table_id_fkey FOREIGN KEY (table_id) REFERENCES public.tables(id),
  CONSTRAINT table_details_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.table_locations(id),
  CONSTRAINT table_details_size_id_fkey FOREIGN KEY (size_id) REFERENCES public.table_sizes(id)
);
CREATE TABLE public.table_sizes (
  id smallint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  upated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT table_sizes_pkey PRIMARY KEY (id)
);
CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  user_id uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  total numeric DEFAULT '0'::numeric,
  reservation_date date,
  reservation_time time without time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  upadated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.order_menu_lines (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  order_id uuid NOT NULL DEFAULT gen_random_uuid(),
  menu_id bigint NOT NULL,
  quantity smallint,
  snapshot_price numeric,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT order_menu_lines_pkey PRIMARY KEY (id),
  CONSTRAINT order_menu_lines_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id),
  CONSTRAINT order_menu_lines_menu_id_fkey FOREIGN KEY (menu_id) REFERENCES public.menus(id)
);
CREATE TABLE public.menu_images (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  menu_id bigint,
  image_url character varying,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT menu_images_pkey PRIMARY KEY (id),
  CONSTRAINT menu_images_menu_id_fkey1 FOREIGN KEY (menu_id) REFERENCES public.menus(id)
);
CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT auth.uid() UNIQUE,
  role_id bigint DEFAULT '3'::bigint,
  email character varying,
  full_name character varying,
  birthday date,
  phone character varying,
  gender character varying,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id),
  CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id)
);
CREATE TABLE public.order_table_lines (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  order_id uuid NOT NULL,
  table_id bigint NOT NULL,
  table_name character varying NOT NULL,
  reservation_date date NOT NULL,
  reservation_time time without time zone NOT NULL,
  guest_count smallint NOT NULL DEFAULT 1,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT order_table_lines_pkey PRIMARY KEY (id),
  CONSTRAINT order_table_lines_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id),
  CONSTRAINT order_table_lines_table_id_fkey FOREIGN KEY (table_id) REFERENCES public.tables(id)
);
CREATE TABLE public.transactions (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid NOT NULL,
  transaction_id character varying NOT NULL UNIQUE,
  total_amount numeric NOT NULL,
  payment_method character varying NOT NULL DEFAULT 'simulation'::character varying CHECK (payment_method::text = ANY (ARRAY['simulation'::character varying, 'cash'::character varying, 'card'::character varying, 'ewallet'::character varying, 'bank_transfer'::character varying]::text[])),
  payment_status character varying NOT NULL DEFAULT 'completed'::character varying CHECK (payment_status::text = ANY (ARRAY['pending'::character varying, 'completed'::character varying, 'failed'::character varying, 'refunded'::character varying]::text[])),
  transaction_date timestamp with time zone NOT NULL DEFAULT now(),
  receipt_file_name character varying,
  order_snapshot jsonb NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  itemsets ARRAY NOT NULL,
  CONSTRAINT transactions_pkey PRIMARY KEY (id),
  CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.roles (
  id smallint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT roles_pkey PRIMARY KEY (id)
);