Cafe
id(uuid)
name
location_id
created_at
updated_at

Location
id
latitude
longitude
adress
city
country

Visit
id
cafe_id
rating
noted
visited_at
created_at

Photo
id
visit_id
file_path
dominant_color
created_at

SyncMetadata
id
entity_type
entity_id
sync_status pending/synced/deleted/conflict
last_syncted_at
version
