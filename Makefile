up:
	supabase start -x realtime,storage-api,inbucket  && docker compose up -d

down:
	supabase stop && docker compose down

reset:
	supabase db reset
	docker volume rm ui-trade_minio
	docker volume rm ui-trade_minio-test
	rm -rf .next
	

.PHONY: up down reset