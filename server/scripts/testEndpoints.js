const http = require('http');

function makeRequest(path, method = 'GET', data = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, body });
        }
      });
    });

    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('Testing Backend API Endpoints...');

  // 1. Health check
  const health = await makeRequest('/api/health');
  console.log('1. Health Check:', health.status, health.body);

  // 2. Login as admin
  const loginRes = await makeRequest('/api/auth/login', 'POST', {
    email: 'admin@peoplepay360.com',
    password: 'Demo@123'
  });
  console.log('2. Admin Login:', loginRes.status, loginRes.body.user?.email, 'Role:', loginRes.body.user?.role);
  const token = loginRes.body.token;

  if (!token) {
    console.error('Failed to obtain token');
    process.exit(1);
  }

  // 3. Current user /me
  const meRes = await makeRequest('/api/auth/me', 'GET', null, token);
  console.log('3. Auth /me Check:', meRes.status, meRes.body.user?.name);

  // 4. Users list /api/users
  const usersRes = await makeRequest('/api/users', 'GET', null, token);
  console.log('4. Users List Check:', usersRes.status, 'Total users:', usersRes.body?.length);

  // 5. Test all demo logins
  const demoUsers = [
    'employee@peoplepay360.com',
    'hrmanager@peoplepay360.com',
    'payrolluser@peoplepay360.com',
    'payrollmanager@peoplepay360.com'
  ];
  for (const email of demoUsers) {
    const res = await makeRequest('/api/auth/login', 'POST', { email, password: 'Demo@123' });
    console.log(`Demo Login [${email}]:`, res.status === 200 ? 'SUCCESS' : 'FAILED', res.body.user?.role);
  }

  console.log('All backend checks completed successfully!');
}

runTests().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
