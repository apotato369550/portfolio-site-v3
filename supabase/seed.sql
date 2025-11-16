-- Seed file for local development
-- This file will be executed after migrations when running 'supabase db reset'

-- Sample GitHub Commits (recent activity)
INSERT INTO github_commits (name, description, last_commit_message, date, url, stars, forks, language)
VALUES
  ('portfolio-site-v3', 'Next.js + Supabase portfolio site with vaporwave aesthetic', 'Added Supabase configs and migrations', '2024-11-17', 'https://github.com/yourusername/portfolio-site-v3', 8, 2, 'TypeScript'),
  ('ai-chatbot', 'AI-powered chatbot using OpenAI API', 'Fixed streaming response bug', '2024-11-15', 'https://github.com/yourusername/ai-chatbot', 15, 5, 'Python'),
  ('task-manager', 'Full-stack task management app', 'Updated API routes', '2024-11-12', 'https://github.com/yourusername/task-manager', 3, 1, 'JavaScript'),
  ('data-viz-dashboard', 'Interactive data visualization dashboard', 'Added new chart types', '2024-11-10', 'https://github.com/yourusername/data-viz', 12, 4, 'TypeScript');

-- Sample GitHub Projects (portfolio showcase)
INSERT INTO github_projects (name, description, image, github_url, tech_stack)
VALUES
  ('Portfolio Site V3', 'Modern vaporwave-styled portfolio built with Next.js, Supabase, and TypeScript. Features ISR caching, external API integrations, and responsive design.', '/assets/portfolio-preview.png', 'https://github.com/yourusername/portfolio-site-v3', '["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS"]'::jsonb),
  ('AI Chatbot', 'Conversational AI chatbot with streaming responses, context retention, and custom embeddings. Built with FastAPI and OpenAI GPT-4.', '/assets/chatbot-preview.png', 'https://github.com/yourusername/ai-chatbot', '["Python", "FastAPI", "OpenAI", "LangChain", "PostgreSQL"]'::jsonb),
  ('Task Manager Pro', 'Collaborative task management platform with real-time updates, team workspaces, and calendar integration.', '/assets/taskmanager-preview.png', 'https://github.com/yourusername/task-manager', '["React", "Node.js", "MongoDB", "Socket.io", "Express"]'::jsonb);

-- Sample LeetCode Submissions (recent problem solving)
INSERT INTO leetcode_submissions (problem_name, submission_date, submission_status)
VALUES
  ('Two Sum', '2024-11-16', 'Accepted'),
  ('Add Two Numbers', '2024-11-15', 'Accepted'),
  ('Longest Substring Without Repeating Characters', '2024-11-14', 'Accepted'),
  ('Median of Two Sorted Arrays', '2024-11-13', 'Accepted'),
  ('Container With Most Water', '2024-11-12', 'Accepted'),
  ('3Sum', '2024-11-11', 'Accepted'),
  ('Letter Combinations of Phone Number', '2024-11-10', 'Accepted');

-- Sample DataCamp Courses (completed certifications)
INSERT INTO datacamp_courses (course_title, course_description, date_completed, certificate_url, image_url)
VALUES
  ('Introduction to Python', 'Master Python basics: variables, data types, functions, and control flow. Build foundational programming skills for data science.', '2024-10-15', 'https://datacamp.com/certificate/python-intro', '/assets/datacamp/python-intro.png'),
  ('Data Manipulation with pandas', 'Learn to efficiently manipulate and analyze data using pandas DataFrames, including filtering, grouping, and merging datasets.', '2024-09-22', 'https://datacamp.com/certificate/pandas', '/assets/datacamp/pandas.png'),
  ('Introduction to SQL', 'Master relational database fundamentals: SELECT queries, JOINs, aggregations, and subqueries for data retrieval.', '2024-08-30', 'https://datacamp.com/certificate/sql-intro', '/assets/datacamp/sql-intro.png'),
  ('Machine Learning with scikit-learn', 'Build predictive models using classification, regression, and clustering algorithms with scikit-learn.', '2024-07-18', 'https://datacamp.com/certificate/ml-scikit', '/assets/datacamp/ml-scikit.png');

-- Sample DataCamp Projects (portfolio projects - using existing v2 images)
INSERT INTO datacamp_projects (project_title, project_description, project_image, project_url)
VALUES
  ('Assessing Customer Churn Using Machine Learning', 'Built a predictive model to identify customers at risk of churning using classification algorithms and feature engineering techniques.', '/assets/datacamp-projects/customer_churn.jpg', 'https://datacamp.com/projects/customer-churn'),
  ('Predicting Credit Card Approvals', 'Developed a machine learning classifier to predict credit card approval decisions with 87% accuracy using scikit-learn and logistic regression.', '/assets/datacamp-projects/credit_card_approvals.webp', 'https://datacamp.com/projects/credit-approvals'),
  ('Hypothesis Testing in Healthcare', 'Applied statistical hypothesis testing to healthcare data to validate treatment effectiveness and patient outcome improvements.', '/assets/datacamp-projects/hypothesis_healthcare.jpg', 'https://datacamp.com/projects/hypothesis-healthcare'),
  ('Predicting Movie Rental Durations', 'Created a regression model to predict movie rental durations based on customer behavior and film characteristics.', '/assets/datacamp-projects/movie_rental_durations.jpg', 'https://datacamp.com/projects/movie-rentals'),
  ('Clustering Antarctic Penguin Species', 'Used unsupervised learning to cluster Antarctic penguin species based on physical measurements and habitat data.', '/assets/datacamp-projects/antarctic_penguin_species.jpg', 'https://datacamp.com/projects/antarctic-penguins');
