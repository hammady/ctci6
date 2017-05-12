package ctci6.ch15.p7;

import java.util.concurrent.Semaphore;

public class FizzBuzz {

	public FizzBuzz(int n) {
		Semaphore t3Sem = new Semaphore(0);
		Semaphore t5Sem = new Semaphore(0);
		Semaphore t15Sem = new Semaphore(0);
		Semaphore tnSem = new Semaphore(0);

		Thread t3 = new Thread(new Runnable(){
			@Override
			public void run() {
				for(int i = 1; i <= n; i++) {
					if (i % 3 == 0 && i % 5 != 0) {
						System.out.println("Fizz");
						t5Sem.release();
						t15Sem.release();
						tnSem.release();
					} else
						try {
							t3Sem.acquire();
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
				}
			}
		});
		Thread t5 = new Thread(new Runnable(){
			@Override
			public void run() {
				for(int i = 1; i <= n; i++) {
					if (i % 3 != 0 && i % 5 == 0) {
						System.out.println("Buzz");
						t3Sem.release();
						t15Sem.release();
						tnSem.release();
					} else
						try {
							t5Sem.acquire();
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
				}
			}
		});
		Thread t15 = new Thread(new Runnable(){
			@Override
			public void run() {
				for(int i = 1; i <= n; i++) {
					if (i % 3 == 0 && i % 5 == 0) {
						System.out.println("FizzBuzz");
						t3Sem.release();
						t5Sem.release();
						tnSem.release();
					} else
						try {
							t15Sem.acquire();
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
				}
			}
		});
		Thread tn = new Thread(new Runnable(){
			@Override
			public void run() {
				for(int i = 1; i <= n; i++) {
					if (i % 3 != 0 && i % 5 != 0) {
						System.out.println(i);
						t3Sem.release();
						t5Sem.release();
						t15Sem.release();
					} else
						try {
							tnSem.acquire();
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
				}
			}
		});
		t15.start();
		t5.start();
		t3.start();
		tn.start();
	}

}
