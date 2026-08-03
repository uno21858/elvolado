FROM python:3.12-slim
ENV PYTHONUNBUFFERED=1

WORKDIR /app
# versiones fijas: un rebuild no jala una major que rompa SamplerV2 / job.usage()
RUN pip install --no-cache-dir "qiskit-ibm-runtime==0.48.0" "qiskit==2.5.1"

COPY server.py config.js app.js como.js legal.js \
     index.html como.html legal.html styles.css README.md og.png ./

EXPOSE 8000
CMD ["python3", "server.py"]
