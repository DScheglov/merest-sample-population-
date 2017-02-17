drop:
	docker rm -f dsch-m-s-p

clean: drop
	docker rmi -f dscheglov/merest-sample-population

build:
	docker build -t dscheglov/merest-sample-population .

run:
	docker run -d \
		 --name=dsch-m-s-p \
		 --link mongodb-server \
		 -p 8083:8083 \
		 dscheglov/merest-sample-population

up: build run
