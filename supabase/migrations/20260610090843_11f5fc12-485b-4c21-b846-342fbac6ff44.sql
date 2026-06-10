CREATE POLICY "Public read project-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

CREATE POLICY "Public upload project-images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Public delete project-images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'project-images');

CREATE POLICY "Public update project-images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'project-images')
  WITH CHECK (bucket_id = 'project-images');