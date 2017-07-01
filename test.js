import childProcess from 'child_process';
import test from 'ava';

test.cb('creating sample node gitignore', t => {
	const cp = childProcess.spawn('node',['./index.js', 'create', 'node']);
	cp.on('error', t.ifError);
	cp.on('close', code => {
    t.is(code,0);
		t.end();
  });
});
