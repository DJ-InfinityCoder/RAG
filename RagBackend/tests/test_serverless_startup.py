"""Regression checks for the Vercel entrypoint and browser health requests."""
import os
import subprocess
import sys
import unittest
from pathlib import Path


class ServerlessStartupTests(unittest.TestCase):
    def test_serverless_health_and_error_cors_without_onnx(self):
        script = r'''
import importlib.abc
import sys

class BlockFlashRank(importlib.abc.MetaPathFinder):
    def find_spec(self, fullname, path=None, target=None):
        if fullname.split('.')[0] in ('flashrank', 'onnxruntime', 'pandas'):
            raise RuntimeError('ONNX must not load in serverless')

sys.meta_path.insert(0, BlockFlashRank())
from main import app
assert 'app.core.rag_engine' not in sys.modules
from app.core import graph_nodes
assert graph_nodes.RerankRequest is None
import io
from openpyxl import Workbook
from app.document_processors.xlsx import extract_xlsx_sheets
workbook = Workbook()
workbook.active.append(['Product', 'Revenue'])
workbook.active.append(['Deployment check', 42])
data = io.BytesIO()
workbook.save(data)
documents = extract_xlsx_sheets(data.getvalue(), 'check.xlsx')
assert documents and '42' in documents[0].page_content
from fastapi.testclient import TestClient

@app.app.get('/test-error')
def test_error():
    raise RuntimeError('test failure')

origin = 'https://askdoc.dilip.website'
with TestClient(app, raise_server_exceptions=False) as client:
    response = client.get('/health', headers={'Origin': origin})
    assert response.status_code == 200, response.text
    assert response.json()['status'] == 'ok'
    assert response.headers['access-control-allow-origin'] == origin
    response = client.options('/health', headers={
        'Origin': origin, 'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'authorization,content-type',
    })
    assert response.status_code == 200
    assert response.headers['access-control-allow-origin'] == origin
    response = client.get('/test-error', headers={'Origin': origin})
    assert response.status_code == 500
    assert response.headers['access-control-allow-origin'] == origin
'''
        env = {**os.environ, 'VERCEL': '1', 'DATABASE_URL': '',
               'ALLOWED_ORIGINS': 'https://askdoc.dilip.website'}
        result = subprocess.run(
            [sys.executable, '-c', script], env=env,
            cwd=Path(__file__).resolve().parents[1],
            capture_output=True, text=True, timeout=60,
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)


if __name__ == '__main__':
    unittest.main()
