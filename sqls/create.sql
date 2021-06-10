DROP TABLE IF EXISTS public.blogs CASCADE;
DROP TABLE IF EXISTS public.authors CASCADE;

CREATE TABLE
    IF NOT EXISTS
        blogs (
            blog_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            category VARCHAR ( 50 ) NOT NULL,
            title VARCHAR ( 50 ) NOT NULL,
			cover VARCHAR ( 50 ) NOT NULL,
			read_time_value INTEGER NOT NULL,
			read_time_unit VARCHAR ( 50 ) NOT NULL,
			author VARCHAR ( 50 ) NOT NULL,
            content VARCHAR ( 50 ) NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW() 
);

CREATE TABLE
	IF NOT EXISTS
		authors(
			author_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			name VARCHAR(50) NOT NULL,
			surname VARCHAR(50) NOT NULL,
			avatar VARCHAR(50) NOT NULL,
			created_at TIMESTAMPTZ DEFAULT NOW()
		);
