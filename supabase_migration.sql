-- Migration to add widget customization columns to projects table
-- Run this if you have an existing database

-- Add widget customization columns
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS widget_primary_color text DEFAULT '#000000',
ADD COLUMN IF NOT EXISTS widget_bg_color text DEFAULT '#ffffff',
ADD COLUMN IF NOT EXISTS widget_text_color text DEFAULT '#000000',
ADD COLUMN IF NOT EXISTS widget_border_radius text DEFAULT '16',
ADD COLUMN IF NOT EXISTS widget_position text DEFAULT 'bottom-right',
ADD COLUMN IF NOT EXISTS widget_theme text DEFAULT 'light',
ADD COLUMN IF NOT EXISTS widget_title text DEFAULT 'How was your experience?',
ADD COLUMN IF NOT EXISTS widget_subtitle text DEFAULT 'Help us improve this project.',
ADD COLUMN IF NOT EXISTS widget_button_text text DEFAULT 'Submit Feedback',
ADD COLUMN IF NOT EXISTS widget_success_title text DEFAULT 'Thank you!',
ADD COLUMN IF NOT EXISTS widget_success_message text DEFAULT 'Your feedback helps us grow.',
ADD COLUMN IF NOT EXISTS widget_show_branding boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS widget_trigger_delay integer DEFAULT 5,
ADD COLUMN IF NOT EXISTS widget_trigger_scroll integer DEFAULT 50,
ADD COLUMN IF NOT EXISTS widget_connected boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS widget_last_ping timestamp with time zone;

-- Update existing rows with defaults if they have NULL values
UPDATE public.projects SET 
  widget_primary_color = COALESCE(widget_primary_color, '#000000'),
  widget_bg_color = COALESCE(widget_bg_color, '#ffffff'),
  widget_text_color = COALESCE(widget_text_color, '#000000'),
  widget_border_radius = COALESCE(widget_border_radius, '16'),
  widget_position = COALESCE(widget_position, 'bottom-right'),
  widget_theme = COALESCE(widget_theme, 'light'),
  widget_title = COALESCE(widget_title, 'How was your experience?'),
  widget_subtitle = COALESCE(widget_subtitle, 'Help us improve this project.'),
  widget_button_text = COALESCE(widget_button_text, 'Submit Feedback'),
  widget_success_title = COALESCE(widget_success_title, 'Thank you!'),
  widget_success_message = COALESCE(widget_success_message, 'Your feedback helps us grow.'),
  widget_show_branding = COALESCE(widget_show_branding, true),
  widget_trigger_delay = COALESCE(widget_trigger_delay, 5),
  widget_trigger_scroll = COALESCE(widget_trigger_scroll, 50),
  widget_connected = COALESCE(widget_connected, false);

-- Add policy to allow widget to read project settings (public read for widget customization)
-- Drop existing policy first if it exists
DROP POLICY IF EXISTS "Public can read project widget settings" ON public.projects;
CREATE POLICY "Public can read project widget settings" ON public.projects
  FOR SELECT USING (true);

-- Add policy to allow widget to update connection status  
DROP POLICY IF EXISTS "Public can update project widget status" ON public.projects;
CREATE POLICY "Public can update project widget status" ON public.projects
  FOR UPDATE USING (true)
  WITH CHECK (true);
