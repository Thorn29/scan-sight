PGDMP         )                z        
   scan-sight    13.4    13.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24869 
   scan-sight    DATABASE     p   CREATE DATABASE "scan-sight" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE "scan-sight";
                postgres    false            �            1259    24893    entries    TABLE     t   CREATE TABLE public.entries (
    id integer NOT NULL,
    content text NOT NULL,
    author_id integer NOT NULL
);
    DROP TABLE public.entries;
       public         heap    postgres    false            �            1259    24891    entries_id_seq    SEQUENCE     �   CREATE SEQUENCE public.entries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.entries_id_seq;
       public          postgres    false    203            �           0    0    entries_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.entries_id_seq OWNED BY public.entries.id;
          public          postgres    false    202            �            1259    24872    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(20) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24870    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    201            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    200            *           2604    24896 
   entries id    DEFAULT     h   ALTER TABLE ONLY public.entries ALTER COLUMN id SET DEFAULT nextval('public.entries_id_seq'::regclass);
 9   ALTER TABLE public.entries ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            )           2604    24875    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200    201            �          0    24893    entries 
   TABLE DATA           9   COPY public.entries (id, content, author_id) FROM stdin;
    public          postgres    false    203   �       �          0    24872    users 
   TABLE DATA           :   COPY public.users (id, name, email, password) FROM stdin;
    public          postgres    false    201   �       �           0    0    entries_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.entries_id_seq', 26, true);
          public          postgres    false    202            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 16, true);
          public          postgres    false    200            0           2606    24908    entries entries_content_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.entries
    ADD CONSTRAINT entries_content_key UNIQUE (content);
 E   ALTER TABLE ONLY public.entries DROP CONSTRAINT entries_content_key;
       public            postgres    false    203            2           2606    24901    entries entries_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.entries
    ADD CONSTRAINT entries_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.entries DROP CONSTRAINT entries_pkey;
       public            postgres    false    203            ,           2606    24879    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    201            .           2606    24877    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    201            3           2606    24902    entries entries_author_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.entries
    ADD CONSTRAINT entries_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id);
 H   ALTER TABLE ONLY public.entries DROP CONSTRAINT entries_author_id_fkey;
       public          postgres    false    201    203    2862            �      x������ � �      �   �   x�m���   �3<�g4rNni�6i�?]4�0P�L����|Ǐ �5-�?V��u�jTuX�[�o�-��a3�O���:�1*����E�����.<v�~�R���o�TZ�n�_�2�:�X�L32�yj'��������x��f�� �_}�7X     