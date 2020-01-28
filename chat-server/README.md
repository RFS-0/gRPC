# Kill all process on port 9090

`lsof -ti tcp:9090 | xargs kill`

# Convert md to pdf

`marp README.md --pdf`